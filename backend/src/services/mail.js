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
    const msg = err.message || String(err);
    if (
      msg.includes("535") ||
      msg.includes("BadCredentials") ||
      err.code === "EAUTH"
    ) {
      console.error(
        "[mail] SMTP authentication failed (535 BadCredentials): invalid SMTP_USER or SMTP_PASS. " +
          "For Gmail, use an App Password (not your regular password). " +
          "Draft/article creation is unaffected — only the notification email failed."
      );
    } else if (!user || !pass) {
      console.warn("[mail] SMTP not configured — email not sent.");
    } else {
      console.error("[mail] Send failed:", msg);
    }
    return { sent: false, reason: msg };
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
