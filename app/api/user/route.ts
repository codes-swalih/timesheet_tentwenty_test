import { NextResponse } from "next/server";
import { users } from "@/lib/mockData";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user)
    return NextResponse.json(
      { ok: false, message: "Invalid credentials" },
      { status: 401 }
    );

  return NextResponse.json({
    ok: true,
    token: "MOCK_TOKEN_123",
    user: { id: user.id, name: user.name, email: user.email },
  });
}
