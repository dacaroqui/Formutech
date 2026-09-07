import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const nombre = String(data.get("nombre") ?? "").trim();
  const empresa = String(data.get("empresa") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const telefono = String(data.get("telefono") ?? "").trim();
  const sector = String(data.get("sector") ?? "").trim();
  const necesidad = String(data.get("necesidad") ?? "").trim();
  if (!nombre || !empresa || !email || !telefono || !sector || !necesidad) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // ponytail: no CRM/email provider in this environment; validate at the boundary and acknowledge.
  return NextResponse.json({ ok: true });
}
