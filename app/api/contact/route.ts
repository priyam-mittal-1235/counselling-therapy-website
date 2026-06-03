import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
};

const ENQUIRIES_FILE = path.join(process.cwd(), "enquiries.json");

// Helper to save enquiry locally
function saveEnquiryLocally(enquiry: any) {
  try {
    let enquiries: any[] = [];
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const data = fs.readFileSync(ENQUIRIES_FILE, "utf-8");
      enquiries = JSON.parse(data || "[]");
    }
    enquiries.unshift(enquiry); // Add new enquiry to the top
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to save enquiry locally:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const requiredFields: Array<keyof ContactPayload> = [
      "name",
      "phone",
      "email",
      "message",
    ];

    const missingField = requiredFields.find((field) => !payload[field]?.trim());

    if (missingField) {
      return NextResponse.json(
        { message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const enquiry = {
      id: Math.random().toString(36).substring(2, 9),
      name: payload.name?.trim(),
      phone: payload.phone?.trim(),
      email: payload.email?.trim(),
      service: payload.service?.trim() || "Not specified",
      message: payload.message?.trim(),
      receivedAt: new Date().toISOString(),
      status: "new", // 'new' | 'contacted' | 'archived'
    };

    // 1. Save to local database (enquiries.json)
    const savedLocally = saveEnquiryLocally(enquiry);

    // 2. Try to send email using Nodemailer if config exists
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || "mindfulliving.1710@gmail.com";

    let emailSent = false;
    let emailError = "";

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const mailOptions = {
          from: `"Mindful Living Website" <${emailUser}>`,
          to: emailTo,
          replyTo: enquiry.email,
          subject: `New Enquiry from ${enquiry.name} - Mindful Living`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded-lg: 8px;">
              <h2 style="color: #2f3a35; border-bottom: 2px solid #7a9e7e; padding-bottom: 10px; margin-top: 0;">New Enquiry Received</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${enquiry.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Phone:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${enquiry.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
                  <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${enquiry.email}" style="color: #7a9e7e; text-decoration: none;">${enquiry.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Service:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${enquiry.service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563; vertical-align: top;">Message:</td>
                  <td style="padding: 8px 0; color: #1f2937; line-height: 1.5; white-space: pre-wrap;">${enquiry.message}</td>
                </tr>
              </table>
              <div style="margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px; font-size: 12px; color: #9ca3af; text-align: center;">
                Received at: ${new Date(enquiry.receivedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log(`Email successfully sent to ${emailTo}`);
      } catch (err) {
        emailError = err instanceof Error ? err.message : String(err);
        console.error("Email sending failed:", err);
      }
    } else {
      console.warn("SMTP credentials not configured. Skipping email notification.");
    }

    return NextResponse.json({
      message: "Thank you. Mindful Living will contact you soon.",
      savedLocally,
      emailSent,
      ...(emailError ? { emailError } : {}),
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { message: "Unable to submit the enquiry right now." },
      { status: 500 }
    );
  }
}
