import { createBrowserClient } from "@supabase/ssr";

function cleanUrl(url: string) {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

export function createClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oxxckjlehayncjmjndxm.supabase.co";
  const supabaseUrl = cleanUrl(rawUrl);
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createBrowserClient(supabaseUrl, supabaseKey);
}
