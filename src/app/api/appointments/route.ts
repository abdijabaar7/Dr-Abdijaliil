import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validations/appointment.schema";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createWhatsAppBookingLink } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success: rateLimitPassed } = checkRateLimit(`appt_${ip}`, 10, 60 * 1000);
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

    // 4. Save to Database using Admin client for reliable server-side insertion
    let appointmentId: string | undefined;

    try {
      const supabaseAdmin = createAdminClient();
      const { data, error } = await supabaseAdmin
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
        console.error("Admin insert error on appointments:", error);
      } else if (data) {
        appointmentId = data.id;
      }
    } catch (adminErr) {
      // Fallback to server client if service key missing
      console.warn("Falling back to server client:", adminErr);
      const supabase = await createServerSupabaseClient();
      await supabase.from("appointments").insert({
        patient_name,
        phone,
        email: email || null,
        appointment_date,
        appointment_time,
        service_id: service_id || null,
        reason: reason || null,
        status: "pending",
      });
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
        appointmentId,
        message: "Your appointment request has been recorded. Our staff will confirm your time slot shortly.",
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
