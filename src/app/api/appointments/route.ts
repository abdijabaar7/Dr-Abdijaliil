import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validations/appointment.schema";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createWhatsAppBookingLink } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const TIME_SLOTS = ["08:30", "09:30", "10:30", "11:30", "13:00", "14:00", "15:00"];

function clinicDateTime() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Mogadishu",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return { date: `${values.year}-${values.month}-${values.day}`, time: `${values.hour}:${values.minute}` };
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "A valid appointment date is required." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", date)
      .in("status", ["pending", "confirmed"]);

    if (error) throw error;
    const unavailableSlots = new Set((data || []).map((item) => item.appointment_time.slice(0, 5)));
    const now = clinicDateTime();
    if (date === now.date) TIME_SLOTS.filter((slot) => slot <= now.time).forEach((slot) => unavailableSlots.add(slot));
    return NextResponse.json({ unavailableSlots: [...unavailableSlots] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Could not load appointment availability:", error);
    return NextResponse.json({ error: "Appointment availability is temporarily unavailable." }, { status: 503 });
  }
}

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

    // 4. Insert the request. A partial unique index is the final guard against
    // two patients claiming the same slot at the same time.
    let appointmentId: string | undefined;

    try {
      const supabaseAdmin = createAdminClient();
      const { data: existing, error: availabilityError } = await supabaseAdmin
        .from("appointments")
        .select("id")
        .eq("appointment_date", appointment_date)
        .eq("appointment_time", appointment_time)
        .in("status", ["pending", "confirmed"])
        .limit(1);

      if (availabilityError) {
        console.error("Appointment availability check failed:", availabilityError);
        return NextResponse.json({ error: "We could not verify this time. Please try again shortly." }, { status: 503 });
      }
      if (existing?.length) {
        return NextResponse.json({ error: "Waqtigan hore ayaa loo qabsaday. Fadlan dooro waqti kale." }, { status: 409 });
      }

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

      if (error?.code === "23505") {
        return NextResponse.json(
          { error: "Qof kale ayaa waqtigan hadda qabsaday. Fadlan dooro waqti kale." },
          { status: 409 }
        );
      }
      if (error) {
        console.error("Admin insert error on appointments:", error);
        return NextResponse.json({ error: "Ballanta lama kaydin. Fadlan mar kale isku day." }, { status: 503 });
      }
      if (data) appointmentId = data.id;
    } catch (adminErr) {
      // Fallback to server client if service key missing
      console.warn("Falling back to server client:", adminErr);
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase.from("appointments").insert({
        patient_name,
        phone,
        email: email || null,
        appointment_date,
        appointment_time,
        service_id: service_id || null,
        reason: reason || null,
        status: "pending",
      });
      if (error?.code === "23505") {
        return NextResponse.json({ error: "Qof kale ayaa waqtigan hadda qabsaday. Fadlan dooro waqti kale." }, { status: 409 });
      }
      if (error) throw error;
      appointmentId = data?.id;
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
        message: "Your request was received. The clinic team will contact you to confirm your appointment.",
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
