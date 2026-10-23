import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface DoctorAdminCheck {
  isAuthorized: boolean;
  user: { id: string; email?: string } | null;
}

/**
 * Verifies that the current request is from an authenticated user listed in public.doctor_admins
 */
export async function verifyDoctorAdmin(): Promise<DoctorAdminCheck> {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { isAuthorized: false, user: null };
    }

    // Query doctor_admins table using server client
    const { data: adminRecord, error: adminError } = await supabase
      .from("doctor_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      return { isAuthorized: false, user: { id: user.id, email: user.email } };
    }

    return {
      isAuthorized: true,
      user: { id: user.id, email: user.email },
    };
  } catch {
    return { isAuthorized: false, user: null };
  }
}

