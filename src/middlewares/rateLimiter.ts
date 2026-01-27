// rateLimiter.ts
import type { Request, Response, NextFunction } from "express";

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 4; // per IP per window

type RateLimitRecord = {
  count: number;
  startTime: number;
};

const ipStore = new Map<string, RateLimitRecord>();

export function ipRateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)
      ?.split(",")[0]
      ?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record) {
    ipStore.set(ip, { count: 1, startTime: now });
    return next();
  }

  // Window expired → reset
  if (now - record.startTime > WINDOW_MS) {
    ipStore.set(ip, { count: 1, startTime: now });
    return next();
  }

  record.count += 1;

  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests",
      retryAfterMs: WINDOW_MS - (now - record.startTime),
    });
  }

  next();
}
