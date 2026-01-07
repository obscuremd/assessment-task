import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config();

let transporter: Transporter;

transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // false for STARTTLS
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD, // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
  // force IPv4 (optional)
  family: 4,
} as SMTPTransport.Options); // ⚠️ 'as any' fixes TS type errors here

export async function sendMail(to: string, subject: string, body: string) {
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2 style="color: #333333;">Assessment Task</h2>
          <p style="font-size: 16px; color: #555555;">${body}</p>
          <hr style="border: none; border-top: 1px solid #eeeeee;" />
          <p style="font-size: 12px; color: #aaaaaa;">
            You're receiving this email from the Assessment Task notification system.
          </p>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Assessment Task" <${
      process.env.SMTP_USERNAME || "md.erhenede@gmail.com"
    }>`,
    to,
    subject,
    html,
  });
}
