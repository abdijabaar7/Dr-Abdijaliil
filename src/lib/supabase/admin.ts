import { createClient } from "@supabase/supabase-js";

function cleanUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

/**
 * Server-only Supabase client with the service role key.
 * Used exclusively in secure server-side handlers (never imported into client components).
 */
export function createAdminClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oxxckjlehayncjmjndxm.supabase.co";
  const supabaseUrl = cleanUrl(rawUrl);
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for administrative operations.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
