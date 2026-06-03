import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PAYMENTS_FILE = path.join(process.cwd(), "payments.json");

function readPayments() {
  try {
    if (!fs.existsSync(PAYMENTS_FILE)) fs.writeFileSync(PAYMENTS_FILE, "[]");
    const payments = JSON.parse(fs.readFileSync(PAYMENTS_FILE, "utf-8"));
    
    let changed = false;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const updated = payments.map((p: any) => {
      if (p.status === "pending" && new Date(p.generatedAt) < oneHourAgo) {
        p.status = "cancelled";
        changed = true;
      }
      return p;
    });

    if (changed) {
      fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(updated, null, 2));
    }
    return updated;
  } catch {
    return [];
  }
}

function writePayments(data: unknown[]) {
  fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(data, null, 2));
}

// GET — fetch all payment records (expired ones are auto-cancelled on read)
export async function GET() {
  const payments = readPayments();
  // newest first
  return NextResponse.json([...payments].reverse());
}

// POST — save a new payment record when QR is generated
export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email, service, amount } = body;

  if (!name || !phone || !service || !amount) {
    return NextResponse.json({ message: "Missing fields." }, { status: 400 });
  }

  const payments = readPayments();
  const newRecord = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    phone,
    email: email || "",
    service,
    amount,
    status: "pending",          // pending | confirmed | cancelled
    generatedAt: new Date().toISOString(),
  };

  payments.push(newRecord);
  writePayments(payments);

  return NextResponse.json({ message: "Saved.", id: newRecord.id });
}

// PATCH — update payment status
export async function PATCH(request: Request) {
  const { id, status } = await request.json();
  const payments = readPayments();
  const idx = payments.findIndex((p: { id: string }) => p.id === id);
  if (idx === -1) return NextResponse.json({ message: "Not found." }, { status: 404 });

  payments[idx].status = status;
  writePayments(payments);
  return NextResponse.json({ message: "Updated." });
}

// DELETE — remove a payment record
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const payments = readPayments();
  const filtered = payments.filter((p: { id: string }) => p.id !== id);
  writePayments(filtered);
  return NextResponse.json({ message: "Deleted." });
}
