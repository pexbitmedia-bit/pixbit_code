type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

export function allowRequest(key: string): boolean {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [id, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(id);
    }
  }

  const current = buckets.get(key);
  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (current.count >= MAX_HITS) return false;
  current.count += 1;
  return true;
}
