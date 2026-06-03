import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ENQUIRIES_FILE = path.join(process.cwd(), "enquiries.json");

// Helper to read enquiries
function getEnquiries() {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const data = fs.readFileSync(ENQUIRIES_FILE, "utf-8");
      return JSON.parse(data || "[]");
    }
  } catch (error) {
    console.error("Failed to read enquiries:", error);
  }
  return [];
}

// Helper to save enquiries
function saveEnquiries(enquiries: any[]) {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to save enquiries:", error);
    return false;
  }
}

export async function GET() {
  const enquiries = getEnquiries();
  return NextResponse.json(enquiries);
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ message: "Invalid parameters." }, { status: 400 });
    }

    const enquiries = getEnquiries();
    const index = enquiries.findIndex((item: any) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ message: "Enquiry not found." }, { status: 404 });
    }

    enquiries[index].status = status;
    saveEnquiries(enquiries);

    return NextResponse.json({ message: "Status updated successfully.", enquiry: enquiries[index] });
  } catch (error) {
    console.error("Failed to update status:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Enquiry ID required." }, { status: 400 });
    }

    const enquiries = getEnquiries();
    const filtered = enquiries.filter((item: any) => item.id !== id);

    if (enquiries.length === filtered.length) {
      return NextResponse.json({ message: "Enquiry not found." }, { status: 404 });
    }

    saveEnquiries(filtered);
    return NextResponse.json({ message: "Enquiry deleted successfully." });
  } catch (error) {
    console.error("Failed to delete enquiry:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
