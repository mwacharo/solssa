# SOLSSA – Solutions for Africa

> Powerful software solutions built for African businesses.

**Live site:** [https://www.solssa.com](https://www.solssa.com)

---

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Inline CSS (no Tailwind needed)
- **Fonts:** Syne + DM Sans (Google Fonts)
- **Hosting:** Vercel
- **Domain:** solssa.com

---

## 📁 Project Structure

```
solssa/
├── src/
│   ├── app/
│   │   ├── layout.js       ← SEO metadata, fonts
│   │   ├── page.js         ← Home page entry
│   │   └── globals.css     ← Base reset styles
│   └── components/
│       └── SOLSSA.jsx      ← Full website component
├── public/                 ← Static assets (logo, images)
├── vercel.json             ← Vercel deployment config
├── next.config.js          ← Next.js config
├── package.json
└── .gitignore
```

---

## 🛠️ Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/solssa.git
cd solssa

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel + solssa.com

### Step 1 – Push to GitHub
```bash
git init
git add .
git commit -m "Initial SOLSSA website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/solssa.git
git push -u origin main
```

### Step 2 – Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub)
2. Click **"Add New Project"**
3. Import your **solssa** GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site goes live at `https://solssa.vercel.app`

### Step 3 – Connect solssa.com Domain
1. In Vercel dashboard → your project → **Settings → Domains**
2. Add `solssa.com` and `www.solssa.com`
3. Vercel gives you **DNS records** to add:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 76.76.21.21 |
| CNAME | www  | cname.vercel-dns.com |

4. Go to your domain registrar (e.g. GoDaddy, Namecheap, Google Domains)
5. Add those two DNS records
6. Wait 5–30 minutes for DNS to propagate
7. ✅ **solssa.com is live!**

---

## 📧 Setting Up the Contact Form (Optional Next Steps)

To make the contact form actually send emails, add one of these:
- **Resend** (recommended) — [resend.com](https://resend.com)
- **EmailJS** — client-side, no backend needed
- **Formspree** — drop-in form handling

---

## 📞 Support

For questions about this project, contact the SOLSSA team at **hello@solssa.com**
# solssa
