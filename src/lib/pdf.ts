/* ─────────────────────────────────────────────────────────────────────
   PDF Generation using jsPDF (no jspdf-autotable plugin)
   All table drawing is done manually — works reliably in Next.js SSR
   ───────────────────────────────────────────────────────────────────── */
import type { Quotation } from "@/types/crm";

export async function generateQuotationPDF(quotation: Quotation): Promise<Buffer> {
  const { jsPDF } = await import("jspdf");

  const doc  = new jsPDF({ unit: "mm", format: "a4" });
  const W    = 210;
  const L    = 14;   // left margin
  const R    = W - 14; // right edge

  const co = {
    name:    process.env.PDF_COMPANY_NAME    ?? "Eveda Online Services",
    email:   process.env.PDF_COMPANY_EMAIL   ?? "info@evedaonlineservices.com",
    phone:   process.env.PDF_COMPANY_PHONE   ?? "+91 8630508235",
    address: process.env.PDF_COMPANY_ADDRESS ?? "53 eVeda Online Services Aryanagar, Haridwar",
    website: process.env.PDF_COMPANY_WEBSITE ?? "https://evedaonlineservices.com",
  };

  // ── Helper: draw a filled rect ────────────────────────────────────
  const fillRect = (x: number, y: number, w: number, h: number, r: number, g: number, b: number) => {
    doc.setFillColor(r, g, b);
    doc.rect(x, y, w, h, "F");
  };

  // ── Top accent bar ────────────────────────────────────────────────
  fillRect(0, 0, W, 5, 91, 91, 214); // indigo

  // ── Company name & contact ────────────────────────────────────────
  let y = 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 40);
  doc.text(co.name, L, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 130);
  y += 5;
  doc.text(`${co.email}  ·  ${co.phone}  ·  ${co.website}`, L, y);

  // ── QUOTATION label (top-right) ───────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(91, 91, 214);
  doc.text("QUOTATION", R, 16, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(110, 110, 130);
  doc.text(`#${quotation.quotationId}`, R, 23, { align: "right" });
  doc.text(`Date: ${new Date(quotation.createdAt).toLocaleDateString("en-IN")}`, R, 29, { align: "right" });
  doc.text(`Valid Until: ${new Date(quotation.validUntil).toLocaleDateString("en-IN")}`, R, 35, { align: "right" });

  // ── Divider ───────────────────────────────────────────────────────
  y = 42;
  doc.setDrawColor(210, 210, 230);
  doc.setLineWidth(0.4);
  doc.line(L, y, R, y);

  // ── Bill To ──────────────────────────────────────────────────────
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 140);
  doc.text("BILL TO", L, y);

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 40);
  doc.text(quotation.leadName, L, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 120);
  y += 5; doc.text(quotation.leadEmail, L, y);
  y += 4; doc.text(quotation.leadPhone, L, y);
  if (quotation.leadCompany) { y += 4; doc.text(quotation.leadCompany, L, y); }

  // ── Items table ───────────────────────────────────────────────────
  y += 12;

  // Column widths (total = 182mm usable)
  const COL = { num: 10, desc: 76, qty: 18, price: 32, disc: 20, total: 26 };
  const ROW_H = 8;
  const HEAD_H = 8;

  // Header background
  fillRect(L, y, R - L, HEAD_H, 91, 91, 214);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  let cx = L + 2;
  doc.text("#",           cx + COL.num  / 2, y + 5.5, { align: "center" }); cx += COL.num;
  doc.text("Description", cx + 2,           y + 5.5);                        cx += COL.desc;
  doc.text("Qty",         cx + COL.qty  / 2, y + 5.5, { align: "center" }); cx += COL.qty;
  doc.text("Unit Price",  cx + COL.price/ 2, y + 5.5, { align: "center" }); cx += COL.price;
  doc.text("Disc",        cx + COL.disc / 2, y + 5.5, { align: "center" }); cx += COL.disc;
  doc.text("Total",       R - 4,             y + 5.5, { align: "right" });

  y += HEAD_H;

  // Rows
  quotation.items.forEach((item, idx) => {
    const isAlt = idx % 2 === 1;
    if (isAlt) fillRect(L, y, R - L, ROW_H, 248, 248, 255);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 70);

    let rx = L + 2;
    doc.text(String(idx + 1), rx + COL.num / 2, y + 5.5, { align: "center" }); rx += COL.num;

    // Description — truncate if too long
    const desc = doc.splitTextToSize(item.description, COL.desc - 4)[0] ?? item.description;
    doc.text(desc, rx + 2, y + 5.5); rx += COL.desc;

    doc.text(String(item.quantity),
      rx + COL.qty / 2, y + 5.5, { align: "center" }); rx += COL.qty;

    doc.text(`Rs.${Number(item.unitPrice).toLocaleString("en-IN")}`,
      rx + COL.price / 2, y + 5.5, { align: "center" }); rx += COL.price;

    doc.text(item.discount > 0 ? `${item.discount}%` : "—",
      rx + COL.disc / 2, y + 5.5, { align: "center" }); rx += COL.disc;

    doc.setFont("helvetica", "bold");
    doc.text(`Rs.${Number(item.total).toLocaleString("en-IN")}`,
      R - 4, y + 5.5, { align: "right" });

    // Row bottom border
    doc.setDrawColor(220, 220, 235);
    doc.setLineWidth(0.2);
    doc.line(L, y + ROW_H, R, y + ROW_H);

    y += ROW_H;
  });

  // ── Totals (right-aligned block) ──────────────────────────────────
  y += 8;
  const addTotalRow = (label: string, value: string, bold = false, accent = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 10 : 8.5);
    doc.setTextColor(
      accent ? 91 : (bold ? 20 : 100),
      accent ? 91 : (bold ? 20 : 100),
      accent ? 214 : (bold ? 40 : 120)
    );
    doc.text(label, R - 55, y);
    doc.text(value, R, y, { align: "right" });
    y += bold ? 8 : 6;
  };

  doc.setDrawColor(210, 210, 230);
  doc.setLineWidth(0.3);
  doc.line(R - 70, y - 4, R, y - 4);

  addTotalRow("Subtotal", `Rs.${Number(quotation.subtotal).toLocaleString("en-IN")}`);
  if (Number(quotation.discountAmount) > 0) {
    addTotalRow("Discount", `-Rs.${Number(quotation.discountAmount).toLocaleString("en-IN")}`);
  }
  addTotalRow(`GST (${quotation.taxRate}%)`, `Rs.${Number(quotation.taxAmount).toLocaleString("en-IN")}`);

  doc.line(R - 70, y - 2, R, y - 2);
  y += 2;
  addTotalRow("TOTAL DUE", `Rs.${Number(quotation.total).toLocaleString("en-IN")}`, true, true);

  // ── Terms ─────────────────────────────────────────────────────────
  if (quotation.terms) {
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 100);
    doc.text("TERMS & CONDITIONS", L, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 130);
    const termLines = doc.splitTextToSize(quotation.terms, R - L);
    doc.text(termLines, L, y);
    y += termLines.length * 4;
  }

  // ── Admin remarks (if any) ────────────────────────────────────────
  if (quotation.adminRemarks) {
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 100);
    doc.text("NOTES", L, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 130);
    const remarkLines = doc.splitTextToSize(quotation.adminRemarks, R - L);
    doc.text(remarkLines, L, y);
  }

  // ── Footer bar ────────────────────────────────────────────────────
  const pageH = 297;
  fillRect(0, pageH - 12, W, 12, 91, 91, 214);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(200, 200, 240);
  doc.text(
    `${co.name}  ·  ${co.email}  ·  ${co.phone}  ·  ${co.address}`,
    W / 2, pageH - 4.5, { align: "center" }
  );

  return Buffer.from(doc.output("arraybuffer"));
}

/* ─────────────────────────────────────────────────────────────────────
   Invoice PDF Generation (manual drawing, matches styling)
   ───────────────────────────────────────────────────────────────────── */
import type { Invoice, Payment } from "@/types/crm";

export async function generateInvoicePDF(invoice: Invoice): Promise<Buffer> {
  const { jsPDF } = await import("jspdf");

  const doc  = new jsPDF({ unit: "mm", format: "a4" });
  const W    = 210;
  const L    = 14;
  const R    = W - 14;

  const co = {
    name:    process.env.PDF_COMPANY_NAME    ?? "Eveda Online Services",
    email:   process.env.PDF_COMPANY_EMAIL   ?? "info@evedaonlineservices.com",
    phone:   process.env.PDF_COMPANY_PHONE   ?? "+91 8630508235",
    address: process.env.PDF_COMPANY_ADDRESS ?? "53 eVeda Online Services Aryanagar, Haridwar",
    website: process.env.PDF_COMPANY_WEBSITE ?? "https://evedaonlineservices.com",
  };

  const fillRect = (x: number, y: number, w: number, h: number, r: number, g: number, b: number) => {
    doc.setFillColor(r, g, b);
    doc.rect(x, y, w, h, "F");
  };

  // Top accent bar (emerald green for invoice to distinguish from indigo quotation)
  fillRect(0, 0, W, 5, 16, 185, 129);

  let y = 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 40);
  doc.text(co.name, L, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 130);
  y += 5;
  doc.text(`${co.email}  ·  ${co.phone}  ·  ${co.website}`, L, y);

  // INVOICE label
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(16, 185, 129);
  doc.text("TAX INVOICE", R, 16, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(110, 110, 130);
  doc.text(`#${invoice.invoiceId}`, R, 23, { align: "right" });
  doc.text(`Billing Date: ${new Date(invoice.billingDate).toLocaleDateString("en-IN")}`, R, 29, { align: "right" });
  doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString("en-IN")}`, R, 35, { align: "right" });

  // Status Stamp
  y = 42;
  doc.setDrawColor(210, 210, 230);
  doc.setLineWidth(0.4);
  doc.line(L, y, R, y);

  // Bill To
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 140);
  doc.text("BILL TO", L, y);

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 40);
  doc.text(invoice.leadName, L, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 120);
  y += 5; doc.text(invoice.leadEmail, L, y);
  y += 4; doc.text(invoice.leadPhone, L, y);
  if (invoice.leadCompany) { y += 4; doc.text(invoice.leadCompany, L, y); }

  // Draw Status badge on PDF
  const stat = invoice.status.toUpperCase();
  const badgeColor = stat === "PAID" ? { r:16, g:185, b:129 } : (stat === "PARTIALLY_PAID" ? { r:245, g:158, b:11 } : { r:239, g:68, b:68 });
  doc.setDrawColor(badgeColor.r, badgeColor.g, badgeColor.b);
  doc.setFillColor(badgeColor.r, badgeColor.g, badgeColor.b);
  doc.rect(R - 40, 48, 40, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(stat.replace("_", " "), R - 20, 53.5, { align: "center" });

  // Items table
  y += 12;
  const COL = { num: 10, desc: 76, qty: 18, price: 32, disc: 20, total: 26 };
  const ROW_H = 8;
  const HEAD_H = 8;

  fillRect(L, y, R - L, HEAD_H, 16, 185, 129);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  let cx = L + 2;
  doc.text("#",           cx + COL.num  / 2, y + 5.5, { align: "center" }); cx += COL.num;
  doc.text("Description", cx + 2,           y + 5.5);                        cx += COL.desc;
  doc.text("Qty",         cx + COL.qty  / 2, y + 5.5, { align: "center" }); cx += COL.qty;
  doc.text("Unit Price",  cx + COL.price/ 2, y + 5.5, { align: "center" }); cx += COL.price;
  doc.text("Disc",        cx + COL.disc / 2, y + 5.5, { align: "center" }); cx += COL.disc;
  doc.text("Total",       R - 4,             y + 5.5, { align: "right" });

  y += HEAD_H;

  invoice.items.forEach((item, idx) => {
    const isAlt = idx % 2 === 1;
    if (isAlt) fillRect(L, y, R - L, ROW_H, 248, 253, 250);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 70);

    let rx = L + 2;
    doc.text(String(idx + 1), rx + COL.num / 2, y + 5.5, { align: "center" }); rx += COL.num;

    const desc = doc.splitTextToSize(item.description, COL.desc - 4)[0] ?? item.description;
    doc.text(desc, rx + 2, y + 5.5); rx += COL.desc;

    doc.text(String(item.quantity), rx + COL.qty / 2, y + 5.5, { align: "center" }); rx += COL.qty;
    doc.text(`Rs.${Number(item.unitPrice).toLocaleString("en-IN")}`, rx + COL.price / 2, y + 5.5, { align: "center" }); rx += COL.price;
    doc.text(item.discount > 0 ? `${item.discount}%` : "—", rx + COL.disc / 2, y + 5.5, { align: "center" }); rx += COL.disc;

    doc.setFont("helvetica", "bold");
    doc.text(`Rs.${Number(item.total).toLocaleString("en-IN")}`, R - 4, y + 5.5, { align: "right" });

    doc.setDrawColor(220, 220, 235);
    doc.setLineWidth(0.2);
    doc.line(L, y + ROW_H, R, y + ROW_H);
    y += ROW_H;
  });

  // Totals
  y += 8;
  const addTotalRow = (label: string, value: string, bold = false, accent = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 9.5 : 8.5);
    doc.setTextColor(
      accent ? 16 : (bold ? 20 : 100),
      accent ? 185 : (bold ? 20 : 100),
      accent ? 129 : (bold ? 40 : 120)
    );
    doc.text(label, R - 55, y);
    doc.text(value, R, y, { align: "right" });
    y += bold ? 7 : 5.5;
  };

  doc.setDrawColor(210, 210, 230);
  doc.setLineWidth(0.3);
  doc.line(R - 70, y - 4, R, y - 4);

  addTotalRow("Subtotal", `Rs.${Number(invoice.subtotal).toLocaleString("en-IN")}`);
  if (Number(invoice.discountAmount) > 0) {
    addTotalRow("Discount", `-Rs.${Number(invoice.discountAmount).toLocaleString("en-IN")}`);
  }
  addTotalRow(`GST (${invoice.taxRate}%)`, `Rs.${Number(invoice.taxAmount).toLocaleString("en-IN")}`);
  addTotalRow("TOTAL AMOUNT", `Rs.${Number(invoice.total).toLocaleString("en-IN")}`, true);
  addTotalRow("Amount Paid", `Rs.${Number(invoice.amountPaid).toLocaleString("en-IN")}`);
  
  doc.line(R - 70, y - 2, R, y - 2);
  y += 2;
  addTotalRow("BALANCE DUE", `Rs.${Number(invoice.dueAmount).toLocaleString("en-IN")}`, true, true);

  // Bank details + Terms
  let bottomY = y + 4;
  if (invoice.bankDetails) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 100);
    doc.text("BANK PAYMENT INSTRUCTIONS", L, bottomY);
    bottomY += 4.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 130);
    const bankLines = doc.splitTextToSize(invoice.bankDetails, R - L - 70);
    doc.text(bankLines, L, bottomY);
    bottomY += bankLines.length * 3.5;
  }

  if (invoice.terms) {
    bottomY += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 100);
    doc.text("TERMS & CONDITIONS", L, bottomY);
    bottomY += 4.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 130);
    const termLines = doc.splitTextToSize(invoice.terms, R - L);
    doc.text(termLines, L, bottomY);
  }

  const pageH = 297;
  fillRect(0, pageH - 12, W, 12, 16, 185, 129);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(200, 240, 220);
  doc.text(
    `${co.name}  ·  ${co.email}  ·  ${co.phone}  ·  ${co.address}`,
    W / 2, pageH - 4.5, { align: "center" }
  );

  return Buffer.from(doc.output("arraybuffer"));
}

/* ─────────────────────────────────────────────────────────────────────
   Payment Receipt PDF Generation (manual drawing, matches styling)
   ───────────────────────────────────────────────────────────────────── */
export async function generatePaymentReceiptPDF(
  payment: Payment,
  invoiceIdStr?: string,
  customerName?: string,
  serviceOffered?: string
): Promise<Buffer> {
  const { jsPDF } = await import("jspdf");

  const doc  = new jsPDF({ unit: "mm", format: "a4" });
  const W    = 210;
  const L    = 14;
  const R    = W - 14;

  const co = {
    name:    process.env.PDF_COMPANY_NAME    ?? "Eveda Online Services",
    email:   process.env.PDF_COMPANY_EMAIL   ?? "info@evedaonlineservices.com",
    phone:   process.env.PDF_COMPANY_PHONE   ?? "+91 8630508235",
    address: process.env.PDF_COMPANY_ADDRESS ?? "53 eVeda Online Services Aryanagar, Haridwar",
    website: process.env.PDF_COMPANY_WEBSITE ?? "https://evedaonlineservices.com",
  };

  const fillRect = (x: number, y: number, w: number, h: number, r: number, g: number, b: number) => {
    doc.setFillColor(r, g, b);
    doc.rect(x, y, w, h, "F");
  };

  // Top accent bar (purple/violet for payment slips)
  fillRect(0, 0, W, 5, 124, 58, 237);

  let y = 18;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 40);
  doc.text(co.name, L, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 130);
  y += 5;
  doc.text(`${co.email}  ·  ${co.phone}  ·  ${co.website}`, L, y);

  // RECEIPT label
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(124, 58, 237);
  doc.text("PAYMENT RECEIPT", R, 18, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(110, 110, 130);
  doc.text(`#${payment.paymentId}`, R, 25, { align: "right" });
  doc.text(`Receipt Date: ${new Date(payment.paymentDate).toLocaleDateString("en-IN")}`, R, 31, { align: "right" });

  y = 44;
  doc.setDrawColor(210, 210, 230);
  doc.setLineWidth(0.4);
  doc.line(L, y, R, y);

  // Receipt Content block
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(124, 58, 237);
  doc.text("Receipt Details", L, y);

  // Draw a premium details card
  y += 5;
  fillRect(L, y, R - L, 58, 248, 247, 255);
  doc.setDrawColor(220, 215, 254);
  doc.rect(L, y, R - L, 58);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 80);

  let rowY = y + 8;
  const drawRow = (lbl: string, val: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(lbl, L + 6, rowY);
    doc.setFont("helvetica", "normal");
    
    // truncate if value is very long (e.g. lots of service descriptions)
    const displayVal = val.length > 70 ? val.substring(0, 67) + "..." : val;
    doc.text(displayVal, L + 50, rowY);
    rowY += 8;
  };

  const methodLabels: Record<string, string> = {
    bank_transfer: "Bank Transfer (NEFT/IMPS/RTGS)",
    upi: "UPI (GooglePay/PhonePe/Paytm)",
    card: "Credit/Debit Card",
    cash: "Cash Payment",
    cheque: "Cheque Payment",
    other: "Other Electronic Method"
  };

  drawRow("Paid To:", co.name);
  drawRow("Customer Name:", customerName || "N/A");
  drawRow("Invoice Reference:", invoiceIdStr || "Direct Account Receipt");
  drawRow("Service Offered:", serviceOffered || "N/A");
  drawRow("Payment Method:", methodLabels[payment.paymentMethod] ?? payment.paymentMethod);
  drawRow("Transaction UTR/Ref:", payment.referenceNumber ?? "N/A");

  // Payment Slip Amount box
  y += 68;
  fillRect(L, y, R - L, 16, 243, 244, 246);
  doc.setDrawColor(200, 200, 210);
  doc.rect(L, y, R - L, 16);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(50, 50, 70);
  doc.text("AMOUNT RECEIVED:", L + 6, y + 10.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(124, 58, 237);
  doc.text(`Rs.${Number(payment.amount).toLocaleString("en-IN")}`, R - 6, y + 11, { align: "right" });

  // Notes
  if (payment.notes) {
    y += 24;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 100);
    doc.text("RECEIPT NOTES", L, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 120);
    const noteLines = doc.splitTextToSize(payment.notes, R - L);
    doc.text(noteLines, L, y);
  }

  // Stamp watermark style box
  y += 18;
  doc.setDrawColor(124, 58, 237);
  doc.setLineWidth(1.5);
  doc.rect(R - 55, y, 45, 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(124, 58, 237);
  doc.text("PAID / RECEIVED", R - 32.5, y + 9.5, { align: "center" });

  const pageH = 297;
  fillRect(0, pageH - 12, W, 12, 124, 58, 237);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(230, 210, 255);
  doc.text(
    `${co.name}  ·  ${co.email}  ·  ${co.phone}  ·  ${co.address}`,
    W / 2, pageH - 4.5, { align: "center" }
  );

  return Buffer.from(doc.output("arraybuffer"));
}

