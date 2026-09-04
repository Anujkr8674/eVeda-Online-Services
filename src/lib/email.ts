import nodemailer from "nodemailer";

const mailPort = Number(process.env.MAIL_PORT ?? 587);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST ?? "smtp.gmail.com",
  port: mailPort,
  secure: mailPort === 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: { filename: string; content: Buffer | string; contentType?: string }[];
}

export async function sendEmail(opts: SendEmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"${process.env.PDF_COMPANY_NAME ?? "Eveda Online Services"}" <${process.env.MAIL_USER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      attachments: opts.attachments,
    });
    return true;
  } catch (err) {
    console.error("[Email] Send failed:", err);
    return false;
  }
}

/* ── Templates ───────────────────────────────────────────────────── */
export function leadThankYouTemplate(name: string, services: string[]): string {
  const co = process.env.PDF_COMPANY_NAME ?? "Eveda Online Services";
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #3b82f6, #7c3aed); padding: 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; }
    .body { padding: 32px; }
    .body h2 { color: #111; font-size: 20px; }
    .body p { color: #555; line-height: 1.6; }
    .service-list { background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .service-list li { color: #333; margin: 6px 0; }
    .cta { text-align: center; margin: 24px 0; }
    .cta a { background: linear-gradient(135deg, #3b82f6, #7c3aed); color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${co}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">Thank You for Your Enquiry</p>
    </div>
    <div class="body">
      <h2>Dear ${name},</h2>
      <p>Thank you for reaching out to <strong>${co}</strong>. We have received your enquiry and our team will get back to you within <strong>24 hours</strong>.</p>
      <p><strong>Services you are interested in:</strong></p>
      <div class="service-list">
        <ul style="margin:0;padding-left:20px;">
          ${services.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      <p>Our expert team will analyze your requirements and prepare a detailed proposal for you.</p>
      <div class="cta">
        <a href="${process.env.PDF_COMPANY_WEBSITE ?? "https://evedaonlineservices.com"}">Visit Our Website</a>
      </div>
    </div>
    <div class="footer">
      <p>${co} · ${process.env.PDF_COMPANY_EMAIL} · ${process.env.PDF_COMPANY_PHONE}</p>
      <p style="margin-top:8px">${process.env.PDF_COMPANY_ADDRESS}</p>
    </div>
  </div>
</body>
</html>`;
}

export function quotationEmailTemplate(
  clientName: string,
  quotationId: string,
  total: number
): string {
  const co = process.env.PDF_COMPANY_NAME ?? "Eveda Online Services";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #3b82f6, #7c3aed); padding: 32px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 24px; }
  .body { padding: 32px; }
  .amount { font-size: 32px; font-weight: bold; color: #3b82f6; text-align: center; margin: 20px 0; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>${co}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">Quotation — ${quotationId}</p>
    </div>
    <div class="body">
      <p>Dear <strong>${clientName}</strong>,</p>
      <p>Please find attached your quotation from <strong>${co}</strong>.</p>
      <div class="amount">₹${total.toLocaleString("en-IN")}</div>
      <p>Please review the attached PDF for the complete breakdown of services and pricing.</p>
      <p>This quotation is valid for <strong>30 days</strong>. To proceed, simply reply to this email or contact us at ${process.env.PDF_COMPANY_PHONE}.</p>
    </div>
    <div class="footer">
      <p>${co} · ${process.env.PDF_COMPANY_EMAIL} · ${process.env.PDF_COMPANY_PHONE}</p>
    </div>
  </div>
</body>
</html>`;
}

export function leadAdminNotificationTemplate(
  name: string,
  email: string,
  phone: string,
  company: string,
  services: string[],
  budget: string,
  message: string
): string {
  const co = process.env.PDF_COMPANY_NAME ?? "Eveda Online Services";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: #1e293b; padding: 32px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 24px; }
  .body { padding: 32px; }
  .body h2 { color: #111; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; }
  .body p { color: #334155; line-height: 1.6; margin: 8px 0; }
  .field-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
  .field-table td { padding: 10px; border-bottom: 1px solid #f1f5f9; }
  .field-table td.label { font-weight: bold; color: #64748b; width: 30%; }
  .field-table td.value { color: #0f172a; }
  .message-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Lead Enquiry</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">Received from marketing website</p>
    </div>
    <div class="body">
      <h2>Lead Information</h2>
      <table class="field-table">
        <tr>
          <td class="label">Name</td>
          <td class="value"><strong>${name}</strong></td>
        </tr>
        <tr>
          <td class="label">Email</td>
          <td class="value">${email}</td>
        </tr>
        <tr>
          <td class="label">Phone</td>
          <td class="value">${phone}</td>
        </tr>
        <tr>
          <td class="label">Company</td>
          <td class="value">${company || "N/A"}</td>
        </tr>
        <tr>
          <td class="label">Services</td>
          <td class="value">${services.join(", ") || "Custom IT Solution"}</td>
        </tr>
        <tr>
          <td class="label">Budget</td>
          <td class="value">${budget || "Not Specified"}</td>
        </tr>
      </table>
      
      <h3 style="margin-top: 24px; color: #111;">Project Brief / Message:</h3>
      <div class="message-box">
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
    <div class="footer">
      <p>${co} CRM Automated Alert System</p>
    </div>
  </div>
</body>
</html>`;
}

export function ticketClientConfirmationTemplate(
  clientName: string,
  ticketId: string,
  title: string,
  description: string,
  category: string
): string {
  const co = process.env.PDF_COMPANY_NAME ?? "Eveda Online Services";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #0284c7, #0369a1); padding: 32px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 24px; }
  .body { padding: 32px; }
  .body h2 { color: #111; font-size: 20px; }
  .body p { color: #334155; line-height: 1.6; }
  .ticket-box { background: #f0f9ff; border: 1px dashed #0284c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
  .ticket-box h3 { margin-top: 0; color: #0369a1; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>Support Ticket Received</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">Ticket ID: ${ticketId}</p>
    </div>
    <div class="body">
      <h2>Dear ${clientName},</h2>
      <p>We have successfully logged your support ticket. Our engineering and support team has been notified and is looking into your request.</p>
      
      <div class="ticket-box">
        <h3>${title}</h3>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Description:</strong></p>
        <p style="white-space: pre-wrap; font-size: 14px; color: #475569;">${description}</p>
      </div>

      <p>You can reply directly to this email to add more information or updates to this ticket.</p>
    </div>
    <div class="footer">
      <p>${co} Support Team · ${process.env.PDF_COMPANY_EMAIL}</p>
    </div>
  </div>
</body>
</html>`;
}

export function ticketAdminNotificationTemplate(
  clientName: string,
  clientEmail: string,
  ticketId: string,
  title: string,
  description: string,
  category: string
): string {
  const co = process.env.PDF_COMPANY_NAME ?? "Eveda Online Services";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: #b91c1c; padding: 32px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 24px; }
  .body { padding: 32px; }
  .body h2 { color: #111; font-size: 20px; }
  .body p { color: #334155; line-height: 1.6; }
  .ticket-box { background: #fef2f2; border-left: 4px solid #b91c1c; padding: 20px; border-radius: 0 8px 8px 0; margin: 20px 0; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>[ALERT] New Support Ticket Raised</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">Ticket ID: ${ticketId}</p>
    </div>
    <div class="body">
      <h2>A client has raised a support ticket</h2>
      <p><strong>From:</strong> ${clientName} (${clientEmail})</p>
      <p><strong>Category:</strong> ${category}</p>
      
      <div class="ticket-box">
        <h3 style="margin-top:0; color: #991b1b;">${title}</h3>
        <p style="white-space: pre-wrap; font-size: 14px; color: #475569;">${description}</p>
      </div>

      <p>Please review and assign a developer to this ticket from the CRM dashboard.</p>
    </div>
    <div class="footer">
      <p>${co} CRM Automated Alert System</p>
    </div>
  </div>
</body>
</html>`;
}

export function ticketCommentAdminNotificationTemplate(
  ticketId: string,
  ticketTitle: string,
  commentContent: string
): string {
  const co = process.env.PDF_COMPANY_NAME ?? "Eveda Online Services";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: #0f172a; padding: 20px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 20px; }
  .body { padding: 32px; }
  .comment-box { background: #f8fafc; border-left: 4px solid #64748b; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Ticket Comment</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">Ticket ID: ${ticketId}</p>
    </div>
    <div class="body">
      <p>A client has posted a new comment on ticket <strong>"${ticketTitle}"</strong>:</p>
      
      <div class="comment-box">
        <p style="margin: 0; white-space: pre-wrap;">${commentContent}</p>
      </div>
    </div>
    <div class="footer">
      <p>${co} CRM Automated Alert System</p>
    </div>
  </div>
</body>
</html>`;
}

export function ticketCommentClientNotificationTemplate(
  ticketId: string,
  ticketTitle: string,
  authorName: string,
  commentContent: string
): string {
  const co = process.env.PDF_COMPANY_NAME ?? "Eveda Online Services";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #3b82f6, #7c3aed); padding: 20px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 20px; }
  .body { padding: 32px; }
  .comment-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Update on Ticket ${ticketId}</h1>
    </div>
    <div class="body">
      <p>Hi there,</p>
      <p><strong>${authorName}</strong> added an update/comment to your ticket <strong>"${ticketTitle}"</strong>:</p>
      
      <div class="comment-box">
        <p style="margin: 0; white-space: pre-wrap;">${commentContent}</p>
      </div>
      
      <p>You can reply directly to this email to update the ticket or contact support.</p>
    </div>
    <div class="footer">
      <p>${co} Support Team · ${process.env.PDF_COMPANY_EMAIL}</p>
    </div>
  </div>
</body>
</html>`;
}

export function ticketStatusClientTemplate(
  ticketId: string,
  ticketTitle: string,
  status: string
): string {
  const co = process.env.PDF_COMPANY_NAME ?? "Eveda Online Services";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #10b981, #059669); padding: 20px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 20px; }
  .body { padding: 32px; }
  .status-badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 6px 16px; border-radius: 9999px; font-weight: bold; font-size: 14px; text-transform: uppercase; margin: 16px 0; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
</style></head>
<body>
  <div class="container">
    <div class="header" style="background: ${status === "resolved" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #64748b, #475569)"}">
      <h1>Ticket Status Updated</h1>
    </div>
    <div class="body">
      <p>Hi there,</p>
      <p>Your ticket <strong>"${ticketTitle}"</strong> (ID: ${ticketId}) status has been updated to:</p>
      
      <div class="status-badge" style="background: ${status === "resolved" ? "#d1fae5" : "#f1f5f9"}; color: ${status === "resolved" ? "#065f46" : "#334155"}">
        ${status}
      </div>
      
      <p>If you have any questions or feel this was done in error, please reply to this email or contact support.</p>
    </div>
    <div class="footer">
      <p>${co} Support Team · ${process.env.PDF_COMPANY_EMAIL}</p>
    </div>
  </div>
</body>
</html>`;
}
