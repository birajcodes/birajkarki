import { NextResponse } from "next/server";

// Deliberately lightweight — no I/O, no dependencies. Used by the deploy
// script to verify a new container before traffic is switched to it.
export function GET() {
  return NextResponse.json({ status: "ok" });
}
