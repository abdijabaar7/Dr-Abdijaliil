import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact.schema";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success: rateLimitPassed } = checkRateLimit(`contact_${ip}`, 10, 60 * 1000);
    if (!rateLimitPassed) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, phone, email, subject, message, website_field_hp } = parseResult.data;

    if (website_field_hp && website_field_hp.length > 0) {
      return NextResponse.json({ success: true, message: "Message sent." });
    }

    try {
      const supabaseAdmin = createAdminClient();
      await supabaseAdmin.from("contact_messages").insert({
        name,
        phone,
        email: email || null,
        subject: subject || null,
        message,
        is_read: false,
      });
    } catch {
      const supabase = await createServerSupabaseClient();
      await supabase.from("contact_messages").insert({
        name,
        phone,
        email: email || null,
        subject: subject || null,
        message,
        is_read: false,
      });
    }

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been delivered to Dr. Abdijalii's team." },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("API error in contact route:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
