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

export async function GET(req: NextRequest) {
  const authorized = await isAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized access to doctor appointments." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const supabaseAdmin = createAdminClient();
    let query = supabaseAdmin
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Admin appointments query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ appointments: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const authorized = await isAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized access to doctor appointments." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing appointment id or status." }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();
    const updateData: Record<string, unknown> = { status };
    if (notes !== undefined) {
      updateData.reason = notes;
    }

    const { data, error } = await supabaseAdmin
      .from("appointments")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating appointment status:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, appointment: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authorized = await isAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing appointment id." }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from("appointments").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
