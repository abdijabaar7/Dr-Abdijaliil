import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

function cleanUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oxxckjlehayncjmjndxm.supabase.co";
  const supabaseUrl = cleanUrl(rawUrl);
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Can be called from Server Components where setting cookies is ignored
        }
      },
    },
  });
}
