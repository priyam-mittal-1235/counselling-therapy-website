import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ message: "Server misconfiguration." }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  // Set a secure HTTP-only cookie valid for 8 hours
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  return NextResponse.json({ message: "Authenticated." });
}

export async function DELETE() {
  // Logout — clear the cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ message: "Logged out." });
}
