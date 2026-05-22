export async function sendMail({ to, subject, text, html, attachments }) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  if (!user || !pass) {
    console.log("[mail] (not configured)", subject, to, text.slice(0, 120));
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
      html: html || text.replace(/\n/g, "<br>"),
      attachments
    });
    return { sent: true };
  } catch (err) {
    console.error("[mail]", err.message);
    return { sent: false, reason: err.message };
  }
}

export async function sendAdminEmail({ subject, text, html }) {
  const to = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_GMAIL || "";
  if (!to) return { sent: false, reason: "ADMIN_NOTIFY_EMAIL not set" };
  return sendMail({ to, subject, text, html });
}

export async function sendUserEmail({ to, subject, text, html }) {
  if (!to) return { sent: false, reason: "No recipient" };
  return sendMail({ to, subject, text, html });
}
