import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
});

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { message: "Too many requests!!" },
      { status: 429 }
    );
  }

  return NextResponse.json({
    message: "Request successful!",
  });
}