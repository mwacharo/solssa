# SOLSSA – Form Email Integration Guide

There are 3 ways to wire up the quotation form to send real email notifications.
Pick the one that suits you. All options are free to start.

---

## ✅ OPTION 1 — Resend (Recommended for Next.js)
Free: 3,000 emails/month | Best for: solssa.com on Vercel

### How it works:
Form → Next.js API route → Resend API → Email arrives at hello@solssa.com

### Step 1 — Create a Resend account
1. Go to https://resend.com and sign up (free)
2. Go to API Keys → Create API Key → copy it
3. Go to Domains → Add Domain → add solssa.com
4. Add the DNS records Resend gives you (like you did for Vercel)

### Step 2 — Install Resend in your project
```bash
npm install resend
```

### Step 3 — Add your API key to Vercel
In Vercel → your project → Settings → Environment Variables:
  Name:  RESEND_API_KEY
  Value: re_xxxxxxxxxxxxxx   (your key from Resend)

Also create a local .env.local file (never commit this):
```
RESEND_API_KEY=re_xxxxxxxxxxxxxx
NOTIFY_EMAIL=hello@solssa.com
```

### Step 4 — Create the API route
Create file: src/app/api/quote/route.js

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, product, message } = body;

    // Validate required fields
    if (!name || !email || !product) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Notify your team (internal email)
    await resend.emails.send({
      from: 'SOLSSA Website <noreply@solssa.com>',
      to: [process.env.NOTIFY_EMAIL || 'hello@solssa.com'],
      subject: `🚀 New Quote Request: ${product} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1A7AFF, #00C896); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Quotation Request</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">From the SOLSSA website</p>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px; font-size: 14px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px;">${company || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #1A7AFF;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Phone / WhatsApp</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px;">${phone || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Product Interest</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px;">
                  <span style="background: #dbeafe; color: #1d4ed8; padding: 3px 10px; border-radius: 20px; font-size: 13px; font-weight: 600;">${product}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 14px; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; font-size: 14px;">${message || '—'}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Your SOLSSA Demo Request"
                 style="background: linear-gradient(135deg, #1A7AFF, #0F5FCC); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">
                Reply to ${name}
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
            Sent from solssa.com contact form
          </p>
        </div>
      `,
    });

    // 2. Auto-reply to the client (confirmation email)
    await resend.emails.send({
      from: 'SOLSSA Team <hello@solssa.com>',
      to: [email],
      subject: `We received your request, ${name}! ✅`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1A7AFF, #00C896); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 26px;">SOLSSA</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">Solutions for Africa</p>
          </div>
          <div style="background: white; padding: 36px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <h2 style="color: #0f172a; margin: 0 0 16px; font-size: 20px;">Hi ${name}, we've got your request! 🎉</h2>
            <p style="color: #475569; line-height: 1.7; margin-bottom: 16px;">
              Thank you for your interest in our <strong>${product}</strong>. 
              Our team has received your quotation request and will review it shortly.
            </p>
            <div style="background: #f1f5f9; border-radius: 10px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0; color: #475569; font-size: 14px;"><strong>What happens next:</strong></p>
              <ul style="color: #475569; font-size: 14px; line-height: 2; margin: 10px 0 0; padding-left: 20px;">
                <li>Our team reviews your request (within 24 hours)</li>
                <li>We schedule a free demo call at your convenience</li>
                <li>You receive a tailored quotation for your business</li>
                <li>We onboard your team — usually within days</li>
              </ul>
            </div>
            <p style="color: #475569; line-height: 1.7; margin-bottom: 8px;">
              In the meantime, feel free to reach us on WhatsApp:
            </p>
            <a href="https://wa.me/254700000000" 
               style="background: #25D366; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block; margin-bottom: 24px;">
              💬 Chat on WhatsApp
            </a>
            <p style="color: #94a3b8; font-size: 13px; border-top: 1px solid #e2e8f0; padding-top: 20px; margin: 0;">
              SOLSSA – Solutions for Africa | Nairobi, Kenya<br>
              <a href="https://www.solssa.com" style="color: #1A7AFF;">www.solssa.com</a> | hello@solssa.com
            </p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

### Step 5 — Update the QuoteForm in SOLSSA.jsx
Replace the handleSubmit function with this:

```javascript
const handleSubmit = async () => {
  if (!form.name || !form.email || !form.product) return;
  setStep("loading");

  try {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStep("success");
    } else {
      setStep("error");
    }
  } catch (err) {
    setStep("error");
  }
};
```

Also add "loading" and "error" states to the form:
- loading: show a spinner / "Sending..." message
- error: show "Something went wrong. Please email us directly."

---

## ✅ OPTION 2 — Formspree (Easiest — No Backend Needed)
Free: 50 submissions/month | Best for: getting started fast

### Step 1 — Create account
Go to https://formspree.io → sign up → New Form → copy your form ID

### Step 2 — Replace handleSubmit in SOLSSA.jsx

```javascript
const handleSubmit = async () => {
  if (!form.name || !form.email || !form.product) return;
  setStep("loading");

  const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      product: form.product,
      message: form.message,
      _replyto: form.email,
      _subject: `New Quote Request: ${form.product} — ${form.name}`,
    }),
  });

  if (res.ok) {
    setStep("success");
  } else {
    setStep("error");
  }
};
```

No API key in Vercel needed. Formspree handles everything.
Emails arrive directly at whatever email you registered with.

---

## ✅ OPTION 3 — EmailJS (Pure Frontend, No Server)
Free: 200 emails/month | Best for: zero backend setup

### Step 1
Go to https://emailjs.com → sign up → Add Email Service (Gmail works)
Create an Email Template with variables: {{name}}, {{email}}, {{product}}, etc.
Copy: Service ID, Template ID, Public Key

### Step 2 — Install
```bash
npm install @emailjs/browser
```

### Step 3 — Replace handleSubmit

```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.product) return;
  setStep("loading");

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: form.name,
        company: form.company,
        reply_to: form.email,
        phone: form.phone,
        product: form.product,
        message: form.message,
      },
      'YOUR_PUBLIC_KEY'
    );
    setStep("success");
  } catch {
    setStep("error");
  }
};
```

---

## 📊 Comparison

| Feature              | Resend        | Formspree     | EmailJS       |
|----------------------|---------------|---------------|---------------|
| Free tier            | 3,000/month   | 50/month      | 200/month     |
| Setup difficulty     | Medium        | Easy          | Easy          |
| Custom HTML emails   | ✅ Yes         | ❌ Basic only  | ✅ Yes         |
| Auto-reply to client | ✅ Yes         | ✅ Yes         | ✅ Yes         |
| Uses solssa.com      | ✅ Yes         | ❌ No          | ❌ No          |
| Backend needed       | Yes (API route)| No            | No            |
| Best for             | Production    | Quick start   | No-backend    |

## 🏆 Recommendation for SOLSSA
Use **Resend** — it lets you send from hello@solssa.com, 
send beautiful branded HTML emails to your team AND auto-reply to clients,
and it's free for up to 3,000 emails/month which is more than enough.
