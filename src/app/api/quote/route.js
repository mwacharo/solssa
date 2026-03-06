import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "hello@solssa.com";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, product, message } = body;

    if (!name || !email || !product) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── 1. Internal notification to SOLSSA team ──────────────────────────────
    await resend.emails.send({
      from: "SOLSSA Website <noreply@solssa.com>",
      to: [NOTIFY_EMAIL],
      subject: `🚀 New Quote Request: ${product} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#1A7AFF,#00C896);padding:30px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:22px;">New Quotation Request</h1>
            <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;">Submitted via solssa.com</p>
          </div>
          <div style="background:#f8fafc;padding:30px;border:1px solid #e2e8f0;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Company</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${company || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><a href="mailto:${email}" style="color:#1A7AFF;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${phone || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Product</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><span style="background:#dbeafe;color:#1d4ed8;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:600;">${product}</span></td></tr>
              <tr><td style="padding:10px 0;color:#64748b;vertical-align:top;">Message</td><td style="padding:10px 0;">${message || "—"}</td></tr>
            </table>
            <div style="margin-top:24px;text-align:center;">
              <a href="mailto:${email}?subject=Re: Your SOLSSA Demo Request for ${product}"
                 style="background:linear-gradient(135deg,#1A7AFF,#0F5FCC);color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;display:inline-block;">
                ✉️ Reply to ${name}
              </a>
            </div>
          </div>
          <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:12px;">SOLSSA · solssa.com</p>
        </div>
      `,
    });

    // ── 2. Auto-reply confirmation to the client ─────────────────────────────
    await resend.emails.send({
      from: "SOLSSA Team <hello@solssa.com>",
      to: [email],
      subject: `We received your request, ${name}! ✅`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#1A7AFF,#00C896);padding:36px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:28px;font-weight:800;letter-spacing:-0.5px;">SOLSSA</h1>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Solutions for Africa</p>
          </div>
          <div style="background:white;padding:36px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
            <h2 style="color:#0f172a;margin:0 0 14px;font-size:20px;">Hi ${name}, we got your request! 🎉</h2>
            <p style="color:#475569;line-height:1.7;margin-bottom:16px;">
              Thank you for reaching out about our <strong>${product}</strong>. 
              Our team will review your request and get back to you within <strong>24 hours</strong>.
            </p>
            <div style="background:#f1f5f9;border-radius:10px;padding:20px;margin:20px 0;">
              <p style="margin:0 0 10px;color:#0f172a;font-weight:600;font-size:14px;">What happens next:</p>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${["Our team reviews your request", "We schedule a free demo call", "You receive a tailored quotation", "Onboarding — usually within days"].map((s, i) => `
                  <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#475569;">
                    <span style="background:linear-gradient(135deg,#1A7AFF,#00C896);color:white;width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">${i + 1}</span>
                    ${s}
                  </div>`).join("")}
              </div>
            </div>
            <p style="color:#475569;font-size:14px;margin-bottom:16px;">Need to reach us faster? Chat with us on WhatsApp:</p>
            <a href="https://wa.me/254700000000?text=Hi SOLSSA, I just submitted a quote request for ${encodeURIComponent(product)}"
               style="background:#25D366;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;display:inline-block;margin-bottom:28px;">
              💬 Chat on WhatsApp
            </a>
            <div style="border-top:1px solid #e2e8f0;padding-top:20px;color:#94a3b8;font-size:12px;line-height:1.8;">
              SOLSSA – Solutions for Africa<br>
              Nairobi, Kenya &nbsp;·&nbsp;
              <a href="https://www.solssa.com" style="color:#1A7AFF;">www.solssa.com</a> &nbsp;·&nbsp;
              hello@solssa.com
            </div>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
