import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("dr_admin_session");
  if (adminCookie && adminCookie.value === "true") {
    return true;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      return true;
    }
  } catch {
    // ignore
  }

  return false;
}

// GET: List all registered admin emails
export async function GET() {
  const authorized = await isAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
      .from("doctor_admins")
      .select("user_id, email, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ admins: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST: Create a new doctor admin with email & password
export async function POST(req: NextRequest) {
  const authorized = await isAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Valid email and password (at least 6 characters) are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const supabaseAdmin = createAdminClient();

    // 1. Create or get user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: cleanEmail,
      password: password,
      email_confirm: true,
    });

    if (authError) {
      // If user already exists in Auth, try updating their password
      if (authError.message.includes("already been registered")) {
        const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
        const existing = usersData?.users?.find((u) => u.email?.toLowerCase() === cleanEmail);
        if (existing) {
          await supabaseAdmin.auth.admin.updateUserById(existing.id, { password: password });
          // Ensure they are in doctor_admins
          await supabaseAdmin
            .from("doctor_admins")
            .upsert({ user_id: existing.id, email: cleanEmail }, { onConflict: "user_id" });

          return NextResponse.json({
            success: true,
            message: `Password updated successfully for existing admin: ${cleanEmail}`,
          });
        }
      }
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Add to doctor_admins table
    if (authData.user) {
      const { error: dbError } = await supabaseAdmin.from("doctor_admins").insert({
        user_id: authData.user.id,
        email: cleanEmail,
      });

      if (dbError && !dbError.message.includes("duplicate key")) {
        console.error("Error inserting into doctor_admins:", dbError);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Doctor admin created successfully: ${cleanEmail}`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PATCH: Update password for an existing admin email
export async function PATCH(req: NextRequest) {
  const authorized = await isAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Email and new password (minimum 6 characters) are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const supabaseAdmin = createAdminClient();

    // Find the user by listing users
    const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const user = usersData?.users?.find((u) => u.email?.toLowerCase() === cleanEmail);
    if (!user) {
      return NextResponse.json(
        { error: `User with email ${cleanEmail} was not found.` },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: password,
    });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Password updated successfully for ${cleanEmail}!`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
