import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendMagicLinkEmail({
  email,
  url,
}: {
  email: string;
  url: string;
}) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to: email,
    subject: "Sign in to FormFlow",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>Sign in to FormFlow</h2>

        <p>Click the button below to sign in.</p>

        <p>
          <a
            href="${url}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#111827;
              color:#ffffff;
              text-decoration:none;
              border-radius:8px;
            "
          >
            Sign In
          </a>
        </p>

        <p>This link will expire in a few minutes.</p>

        <p>If you didn't request this email, you can safely ignore it.</p>
      </div>
    `,
  });
}