interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const cache = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (entry.resetAt < now) {
        cache.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Basic in-memory rate limiter for public submissions.
 * @param ip Client IP address or unique key
 * @param limit Max requests allowed in window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(ip: string, limit = 5, windowMs = 60 * 1000): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = cache.get(ip);

  if (!entry || entry.resetAt < now) {
    cache.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count };
}

