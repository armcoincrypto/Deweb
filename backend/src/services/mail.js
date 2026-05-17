export async function sendAdminEmail({ subject, text, html }) {
  const to = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "";
  if (!to) return { sent: false, reason: "ADMIN_NOTIFY_EMAIL not set" };

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  if (!user || !pass) {
    console.log("[mail] (not configured)", subject, text.slice(0, 200));
    return { sent: false, reason: "SMTP_USER/SMTP_PASS not set" };
  }

  try {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
    await transport.sendMail({
      from: process.env.EMAIL_FROM || user,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, "<br>")
    });
    return { sent: true };
  } catch (err) {
    console.error("[mail]", err.message);
    return { sent: false, reason: err.message };
  }
}
