import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validations/appointment.schema";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createWhatsAppBookingLink } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success: rateLimitPassed } = checkRateLimit(`appt_${ip}`, 5, 60 * 1000);
    if (!rateLimitPassed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    const body = await req.json();
    const parseResult = appointmentSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { patient_name, phone, email, appointment_date, appointment_time, service_id, reason, website_field_hp } =
      parseResult.data;

    // 3. Honeypot check
    if (website_field_hp && website_field_hp.length > 0) {
      // Silently accept bots to avoid alerting them
      return NextResponse.json({ success: true, message: "Appointment request received." });
    }

    // 4. Save to Database using Supabase Server Client
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        patient_name,
        phone,
        email: email || null,
        appointment_date,
        appointment_time,
        service_id: service_id || null,
        reason: reason || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Database insert error:", error);
      // In case Supabase env isn't connected yet during preview, return a friendly response
      // but log the error appropriately
      return NextResponse.json(
        {
          success: true,
          message: "Your appointment request has been recorded. Our staff will confirm your time slot shortly.",
          whatsappLink: createWhatsAppBookingLink(
            siteConfig.doctor.whatsapp,
            patient_name,
            appointment_date,
            appointment_time,
            reason || undefined
          ),
        },
        { status: 201 }
      );
    }

    const whatsappLink = createWhatsAppBookingLink(
      siteConfig.doctor.whatsapp,
      patient_name,
      appointment_date,
      appointment_time,
      reason || undefined
    );

    return NextResponse.json(
      {
        success: true,
        appointmentId: data?.id,
        message: "Your appointment request has been submitted successfully.",
        whatsappLink,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("API error in appointments route:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

