import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Products", "Services", "Clients", "About", "Contact"];

const PRODUCTS = [
  {
    icon: "🚚",
    name: "Courier & Fulfillment Software",
    tagline: "End-to-end logistics management",
    color: "#00C896",
    features: ["Order Management", "Waybill Generation", "Delivery Tracking", "Driver & Fleet Management", "Vendor & Warehouse Management", "Customer Notifications", "Payment Reconciliation", "Reporting Dashboards"],
    desc: "A powerful logistics and delivery management platform built for courier companies and e-commerce fulfillment businesses across Africa."
  },
  {
    icon: "📞",
    name: "Call Center Solution",
    tagline: "Customer experience at scale",
    color: "#1A7AFF",
    features: ["Call Tracking", "Customer Interaction Logging", "Support Ticket Management", "Agent Performance Analytics", "CRM Integration", "Reporting Dashboard"],
    desc: "Manage inbound and outbound customer calls efficiently with smart analytics, ticket management, and seamless CRM integration."
  },
  {
    icon: "👥",
    name: "HRM System",
    tagline: "People operations, simplified",
    color: "#FF6B35",
    features: ["Employee Records", "Payroll Management", "Leave Management", "Attendance Tracking", "Performance Monitoring", "HR Analytics"],
    desc: "A comprehensive human resource management system that empowers HR teams to manage their workforce with precision and ease."
  }
];

const SERVICES = [
  { icon: "📣", title: "Facebook & Instagram Advertising", desc: "Targeted ad campaigns that reach your ideal customers across Africa's fastest-growing social platforms." },
  { icon: "🎯", title: "Lead Generation Campaigns", desc: "Data-driven campaigns designed to fill your pipeline with qualified leads ready to convert." },
  { icon: "💻", title: "Website Development", desc: "Professional, high-performance websites built to represent your brand and drive business growth." },
  { icon: "🔍", title: "SEO Optimization", desc: "Rank higher on Google and get discovered by customers searching for what you offer." },
  { icon: "📱", title: "Social Media Management", desc: "Consistent, engaging content that builds your brand and grows your online community." },
  { icon: "⚙️", title: "Business Automation Consulting", desc: "Expert guidance on automating your operations to save time, cut costs, and scale faster." }
];

const CLIENTS = [
  { name: "Rushbin Courier", location: "Kenya", industry: "Courier & Logistics", product: "Courier Management System", desc: "Rushbin scaled their delivery operations across Kenya using SOLSSA's courier software, reducing delivery errors by 60% and improving driver efficiency with real-time tracking.", logo: "RC" },
  { name: "Saam Cosmetics", location: "Uganda & Ghana", industry: "Beauty & Retail", product: "Call Center Solution", desc: "Saam Cosmetics manages thousands of monthly customer orders across two countries from a single dashboard, improving response times and customer satisfaction scores dramatically.", logo: "SC" },
  { name: "Bringit Courier & Fulfillment", location: "Kenya", industry: "Logistics & Fulfillment", product: "Courier Software", desc: "Bringit powers their entire logistics and fulfillment operations with SOLSSA, handling end-to-end order lifecycle from pickup to proof-of-delivery.", logo: "BC" },
  { name: "AlphaHerb", location: "East Africa", industry: "E-commerce", product: "E-commerce & Call Center", desc: "AlphaHerb streamlined their online store operations and customer support with SOLSSA, enabling faster order processing and a seamless shopping experience.", logo: "AH" }
];

const TESTIMONIALS = [
  { name: "James Mwangi", role: "CEO, Rushbin Courier", text: "SOLSSA transformed how we manage deliveries. What used to take hours now happens automatically. Our drivers love the app.", avatar: "JM" },
  { name: "Amina Hassan", role: "Operations Manager, Saam Cosmetics", text: "Managing orders across Uganda and Ghana was a nightmare before SOLSSA. Now everything is in one place. Game changer.", avatar: "AH" },
  { name: "Brian Otieno", role: "Founder, Bringit Fulfillment", text: "The courier software is exactly what the African logistics market needed. Built for our realities, not imported problems.", avatar: "BO" }
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #1A7AFF;
    --green: #00C896;
    --dark: #080E1A;
    --dark2: #0D1526;
    --dark3: #111D35;
    --text: #E8EDF5;
    --muted: #7A8BAA;
    --border: rgba(255,255,255,0.08);
    --card: rgba(255,255,255,0.04);
    --font-head: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: var(--text);
    font-family: var(--font-body);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 2px; }

  /* Noise overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* Nav */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 0 5%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.3s, backdrop-filter 0.3s;
  }
  .nav.scrolled {
    background: rgba(8,14,26,0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-head);
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--blue), var(--green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
  }
  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }
  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-cta {
    background: linear-gradient(135deg, var(--blue), #0F5FCC);
    color: white;
    border: none;
    padding: 0.55rem 1.4rem;
    border-radius: 8px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  }
  .nav-cta:hover { opacity: 0.9; transform: translateY(-1px); }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { width: 24px; height: 2px; background: var(--text); border-radius: 2px; transition: all 0.3s; }

  /* Sections */
  section { position: relative; z-index: 1; }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 120px 5% 80px;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 20%, rgba(26,122,255,0.15) 0%, transparent 70%),
                radial-gradient(ellipse 50% 40% at 80% 60%, rgba(0,200,150,0.1) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%);
  }
  .hero-content { max-width: 750px; position: relative; }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(26,122,255,0.15);
    border: 1px solid rgba(26,122,255,0.3);
    color: var(--blue);
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.6s ease both;
  }
  .hero-badge::before { content: '●'; font-size: 0.5rem; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .hero h1 {
    font-family: var(--font-head);
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero h1 span {
    background: linear-gradient(135deg, var(--blue) 0%, var(--green) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-desc {
    font-size: 1.15rem;
    color: var(--muted);
    max-width: 560px;
    margin-bottom: 2.5rem;
    line-height: 1.7;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--blue), #0F5FCC);
    color: white;
    border: none;
    padding: 0.9rem 2rem;
    border-radius: 10px;
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(26,122,255,0.35);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(26,122,255,0.45); }
  .btn-ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
    padding: 0.9rem 2rem;
    border-radius: 10px;
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }

  .hero-stats {
    display: flex;
    gap: 3rem;
    margin-top: 4rem;
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .stat-item .stat-num {
    font-family: var(--font-head);
    font-size: 2rem;
    font-weight: 800;
    color: var(--text);
  }
  .stat-item .stat-num span { color: var(--green); }
  .stat-item .stat-label { font-size: 0.8rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

  /* Clients strip */
  .clients-strip {
    padding: 3rem 5%;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .clients-strip p {
    text-align: center;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    margin-bottom: 2rem;
  }
  .clients-logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
  }
  .client-logo-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  .client-logo-pill:hover { opacity: 1; }
  .client-logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--blue), var(--green));
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 800;
    color: white;
  }
  .client-logo-name {
    font-family: var(--font-head);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text);
  }

  /* Sections common */
  .section {
    padding: 100px 5%;
  }
  .section-label {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--green);
    margin-bottom: 1rem;
  }
  .section-title {
    font-family: var(--font-head);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 1rem;
  }
  .section-desc {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 500px;
    line-height: 1.7;
  }
  .section-header { margin-bottom: 4rem; }

  /* Products */
  .products-bg { background: var(--dark2); }
  .product-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    padding: 4rem;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    margin-bottom: 2rem;
    transition: border-color 0.3s;
    position: relative;
    overflow: hidden;
  }
  .product-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--card-color, var(--blue)), transparent);
  }
  .product-card:hover { border-color: rgba(255,255,255,0.14); }
  .product-card.reverse { direction: rtl; }
  .product-card.reverse > * { direction: ltr; }
  .product-icon-wrap {
    font-size: 3rem;
    width: 72px; height: 72px;
    background: rgba(255,255,255,0.06);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
  }
  .product-name {
    font-family: var(--font-head);
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }
  .product-tagline {
    font-size: 0.85rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 1rem;
  }
  .product-desc { color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; }
  .features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.87rem;
    color: var(--muted);
  }
  .feature-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .product-visual {
    background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    overflow: hidden;
  }
  .mock-bar {
    height: 10px;
    border-radius: 5px;
    background: rgba(255,255,255,0.08);
    position: relative;
    overflow: hidden;
  }
  .mock-bar::after {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    border-radius: 5px;
    background: linear-gradient(90deg, var(--card-color, var(--blue)), var(--green));
    width: var(--w, 60%);
  }
  .mock-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .mock-avatar {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--blue), var(--green));
    flex-shrink: 0;
  }
  .mock-lines { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .mock-line {
    height: 8px;
    border-radius: 4px;
    background: rgba(255,255,255,0.06);
  }
  .mock-badge {
    padding: 3px 10px;
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 700;
    background: rgba(0,200,150,0.15);
    color: var(--green);
    border: 1px solid rgba(0,200,150,0.25);
    display: inline-block;
  }

  /* Services */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .service-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    transition: transform 0.2s, border-color 0.2s;
  }
  .service-card:hover { transform: translateY(-4px); border-color: rgba(26,122,255,0.25); }
  .service-icon { font-size: 2rem; margin-bottom: 1rem; }
  .service-title { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
  .service-desc { font-size: 0.87rem; color: var(--muted); line-height: 1.6; }

  /* Clients section */
  .clients-bg { background: var(--dark2); }
  .clients-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  .client-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    transition: border-color 0.2s;
  }
  .client-card:hover { border-color: rgba(0,200,150,0.2); }
  .client-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }
  .client-avatar {
    width: 50px; height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--blue), var(--green));
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-head);
    font-size: 0.9rem;
    font-weight: 800;
    color: white;
    flex-shrink: 0;
  }
  .client-name { font-family: var(--font-head); font-size: 1.1rem; font-weight: 700; }
  .client-meta { font-size: 0.8rem; color: var(--muted); }
  .client-product-tag {
    display: inline-block;
    background: rgba(26,122,255,0.12);
    border: 1px solid rgba(26,122,255,0.2);
    color: var(--blue);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    margin-bottom: 0.8rem;
  }
  .client-desc { font-size: 0.87rem; color: var(--muted); line-height: 1.6; }

  /* Testimonials */
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }
  .testimonial-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
  }
  .testimonial-stars { color: #FFB800; font-size: 0.8rem; margin-bottom: 1rem; letter-spacing: 2px; }
  .testimonial-text { font-size: 0.93rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; }
  .testimonial-author { display: flex; align-items: center; gap: 0.8rem; }
  .testimonial-avatar {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--blue), var(--green));
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-head);
    font-size: 0.7rem;
    font-weight: 800;
    color: white;
  }
  .testimonial-name { font-weight: 600; font-size: 0.9rem; }
  .testimonial-role { font-size: 0.78rem; color: var(--muted); }

  /* About */
  .about-bg { background: var(--dark3); }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  .about-text p { color: var(--muted); line-height: 1.8; margin-bottom: 1.2rem; }
  .about-values {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }
  .value-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.2rem;
  }
  .value-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .value-title { font-family: var(--font-head); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.3rem; }
  .value-desc { font-size: 0.8rem; color: var(--muted); }
  .about-visual {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .africa-map {
    font-size: 8rem;
    text-align: center;
    filter: drop-shadow(0 0 40px rgba(0,200,150,0.3));
    line-height: 1;
  }
  .about-stat-row { display: flex; gap: 1.5rem; }
  .about-stat {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border-radius: 12px;
    padding: 1.2rem;
    text-align: center;
  }
  .about-stat-num {
    font-family: var(--font-head);
    font-size: 1.6rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--blue), var(--green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .about-stat-label { font-size: 0.75rem; color: var(--muted); margin-top: 0.2rem; }

  /* Contact / Quote form */
  .contact-bg { background: var(--dark2); }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 4rem;
    align-items: start;
  }
  .contact-info h3 {
    font-family: var(--font-head);
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .contact-info p { color: var(--muted); line-height: 1.7; margin-bottom: 2rem; font-size: 0.93rem; }
  .contact-items { display: flex; flex-direction: column; gap: 1rem; }
  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.9rem;
    color: var(--muted);
  }
  .contact-item-icon {
    width: 36px; height: 36px;
    background: rgba(26,122,255,0.1);
    border: 1px solid rgba(26,122,255,0.2);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.95rem;
    flex-shrink: 0;
  }
  .quote-form {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.5rem;
  }
  .quote-form h3 {
    font-family: var(--font-head);
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 0.4rem;
  }
  .quote-form .form-subtitle { color: var(--muted); font-size: 0.87rem; margin-bottom: 2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { margin-bottom: 1.2rem; }
  .form-group label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--muted);
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: border-color 0.2s;
    outline: none;
    -webkit-appearance: none;
  }
  .form-group input::placeholder,
  .form-group textarea::placeholder { color: rgba(255,255,255,0.2); }
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus { border-color: var(--blue); }
  .form-group select { cursor: pointer; }
  .form-group select option { background: var(--dark2); }
  .form-group textarea { resize: vertical; min-height: 100px; }
  .form-success {
    text-align: center;
    padding: 2rem;
  }
  .form-success .success-icon { font-size: 3rem; margin-bottom: 1rem; }
  .form-success h4 { font-family: var(--font-head); font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem; }
  .form-success p { color: var(--muted); font-size: 0.9rem; }

  /* How it works explanation */
  .quote-flow {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  .quote-flow h4 {
    font-family: var(--font-head);
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--green);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .flow-steps { display: flex; flex-direction: column; gap: 0.7rem; }
  .flow-step {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.82rem;
    color: var(--muted);
  }
  .flow-step-num {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: rgba(26,122,255,0.2);
    border: 1px solid rgba(26,122,255,0.4);
    color: var(--blue);
    font-size: 0.7rem;
    font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* Footer */
  footer {
    background: var(--dark);
    border-top: 1px solid var(--border);
    padding: 4rem 5% 2rem;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }
  .footer-logo {
    font-family: var(--font-head);
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--blue), var(--green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }
  .footer-about { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }
  .footer-col h4 {
    font-family: var(--font-head);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin-bottom: 1.2rem;
  }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .footer-col ul li a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.87rem;
    transition: color 0.2s;
  }
  .footer-col ul li a:hover { color: var(--text); }
  .footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: var(--muted);
  }

  /* Mobile */
  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none; }
    .hamburger { display: flex; }
    .nav-links.open {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 70px; left: 0; right: 0;
      background: var(--dark2);
      border-bottom: 1px solid var(--border);
      padding: 1.5rem 5%;
      gap: 1.2rem;
    }
    .hero-stats { gap: 1.5rem; flex-wrap: wrap; }
    .product-card { grid-template-columns: 1fr; padding: 2rem; }
    .product-card.reverse { direction: ltr; }
    .services-grid { grid-template-columns: 1fr 1fr; }
    .clients-grid { grid-template-columns: 1fr; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
    .about-values { grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .services-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

// ─── Components ───────────────────────────────────────────────────────────────

function MockUI({ color }) {
  return (
    <div className="product-visual" style={{ "--card-color": color }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Dashboard</span>
        <span className="mock-badge">● Live</span>
      </div>
      {[70, 45, 85, 55].map((w, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div className="mock-bar" style={{ "--w": `${w}%` }} />
        </div>
      ))}
      <div style={{ margin: "0.5rem 0", borderTop: "1px solid var(--border)" }} />
      {[1, 2, 3].map(i => (
        <div key={i} className="mock-row">
          <div className="mock-avatar" style={{ opacity: 0.5 + i * 0.15 }} />
          <div className="mock-lines">
            <div className="mock-line" style={{ width: "80%" }} />
            <div className="mock-line" style={{ width: "50%" }} />
          </div>
          <span className="mock-badge" style={{ fontSize: "0.65rem" }}>#{100 + i * 7}</span>
        </div>
      ))}
      <div style={{
        position: "absolute", bottom: "1rem", right: "1rem",
        width: 60, height: 60, borderRadius: "50%",
        background: `radial-gradient(circle, ${color}40, transparent)`,
        filter: "blur(15px)"
      }} />
    </div>
  );
}

function QuoteForm() {
  // steps: "form" | "loading" | "success" | "error"
  const [step, setStep] = useState("form");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", product: "", message: "" });

  const handleChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: false }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.product) e.product = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
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
    } catch {
      setStep("error");
    }
  };

  if (step === "loading") return (
    <div className="quote-form">
      <div className="form-success">
        <div className="success-icon" style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</div>
        <h4>Sending your request…</h4>
        <p style={{ color: "var(--muted)" }}>Please wait a moment.</p>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    </div>
  );

  if (step === "success") return (
    <div className="quote-form">
      <div className="form-success">
        <div className="success-icon">🎉</div>
        <h4>Request Sent!</h4>
        <p>
          Thank you, <strong>{form.name}</strong>! We've sent a confirmation to <strong>{form.email}</strong>.<br />
          Our team will contact you within 24 hours about <strong>{form.product}</strong>.
        </p>
        <button
          className="btn-primary"
          style={{ marginTop: "1.5rem", fontSize: "0.9rem" }}
          onClick={() => { setStep("form"); setForm({ name: "", company: "", email: "", phone: "", product: "", message: "" }); }}
        >
          Submit Another Request
        </button>
      </div>
    </div>
  );

  if (step === "error") return (
    <div className="quote-form">
      <div className="form-success">
        <div className="success-icon">⚠️</div>
        <h4>Something went wrong</h4>
        <p style={{ color: "var(--muted)" }}>
          We couldn't send your request. Please email us directly at{" "}
          <a href="mailto:hello@solssa.com" style={{ color: "var(--blue)" }}>hello@solssa.com</a>{" "}
          or WhatsApp us.
        </p>
        <button className="btn-ghost" style={{ marginTop: "1.5rem", fontSize: "0.9rem" }} onClick={() => setStep("form")}>
          Try Again
        </button>
      </div>
    </div>
  );

  const fieldStyle = (name) => ({
    borderColor: errors[name] ? "#ef4444" : undefined,
  });

  return (
    <div className="quote-form">
      <h3>Request a Quotation</h3>
      <p className="form-subtitle">Tell us about your business — we'll get back with a tailored demo & pricing.</p>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input name="name" placeholder="John Kamau" value={form.name} onChange={handleChange} style={fieldStyle("name")} />
          {errors.name && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>Name is required</span>}
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input name="company" placeholder="Rushbin Courier" value={form.company} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Email Address *</label>
          <input name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} style={fieldStyle("email")} />
          {errors.email && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>Valid email required</span>}
        </div>
        <div className="form-group">
          <label>Phone / WhatsApp</label>
          <input name="phone" placeholder="+254 700 000 000" value={form.phone} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Which solution interests you? *</label>
        <select name="product" value={form.product} onChange={handleChange} style={fieldStyle("product")}>
          <option value="">Select a product or service…</option>
          <option value="Courier & Fulfillment Software">Courier & Fulfillment Software</option>
          <option value="Call Center Solution">Call Center Solution</option>
          <option value="HRM System">HRM System</option>
          <option value="Digital Marketing Services">Digital Marketing Services</option>
          <option value="Website Development">Website Development</option>
          <option value="Multiple Solutions">Multiple Solutions</option>
        </select>
        {errors.product && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>Please select a product</span>}
      </div>
      <div className="form-group">
        <label>Tell us about your business</label>
        <textarea name="message" placeholder="Briefly describe your business and what you're looking to achieve…" value={form.message} onChange={handleChange} />
      </div>
      <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleSubmit}>
        Submit Request → Get Quotation
      </button>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function SOLSSA() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => scrollTo("home")}>SOLSSA</div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["home", "products", "services", "clients", "about", "contact"].map(s => (
            <li key={s}><a href="#" onClick={e => { e.preventDefault(); scrollTo(s); }} style={{ textTransform: "capitalize" }}>{s}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>Request Demo</button>
        <div className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">🌍 Built for Africa</div>
          <h1>Powerful Software Solutions<br /><span>Built for African Businesses.</span></h1>
          <p className="hero-desc">SOLSSA builds reliable, scalable, and affordable technology to help logistics companies, e-commerce businesses, and service companies across Africa grow faster and operate smarter.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Request a Demo</button>
            <button className="btn-ghost" onClick={() => scrollTo("products")}>Explore Products</button>
          </div>
          <div className="hero-stats">
            {[["4+", "Products Built"], ["100+", "Businesses Served"], ["5+", "African Countries"], ["99.9%", "Uptime SLA"]].map(([n, l]) => (
              <div key={l} className="stat-item">
                <div className="stat-num">{n.replace("+", "")}<span>{n.includes("+") ? "+" : ""}</span></div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTS STRIP ── */}
      <div className="clients-strip">
        <p>Trusted by businesses across Africa</p>
        <div className="clients-logos">
          {CLIENTS.map(c => (
            <div key={c.name} className="client-logo-pill">
              <div className="client-logo-icon">{c.logo}</div>
              <span className="client-logo-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section id="products" className="section products-bg">
        <div className="section-header">
          <span className="section-label">Our Products</span>
          <h2 className="section-title">Software Designed for<br />African Business Realities</h2>
          <p className="section-desc">Three powerful platforms that solve real operational challenges faced by African businesses every day.</p>
        </div>
        {PRODUCTS.map((p, i) => (
          <div
            key={p.name}
            className={`product-card ${i % 2 !== 0 ? "reverse" : ""}`}
            style={{ "--card-color": p.color }}
          >
            <div>
              <div className="product-icon-wrap">{p.icon}</div>
              <div className="product-tagline">{p.tagline}</div>
              <div className="product-name">{p.name}</div>
              <p className="product-desc">{p.desc}</p>
              <div className="features-grid">
                {p.features.map(f => (
                  <div key={f} className="feature-item">
                    <div className="feature-dot" style={{ background: p.color }} />
                    {f}
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ marginTop: "1.5rem", fontSize: "0.9rem", background: `linear-gradient(135deg, ${p.color}, ${p.color}bb)` }} onClick={() => scrollTo("contact")}>
                Get a Demo →
              </button>
            </div>
            <MockUI color={p.color} />
          </div>
        ))}
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section">
        <div className="section-header">
          <span className="section-label">Digital Services</span>
          <h2 className="section-title">Grow Your Business<br />Online with SOLSSA</h2>
          <p className="section-desc">Beyond software, we help African businesses grow their digital presence and automate their operations.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div key={s.title} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section id="clients" className="section clients-bg">
        <div className="section-header">
          <span className="section-label">Our Clients</span>
          <h2 className="section-title">Trusted by Businesses<br />Across Africa</h2>
          <p className="section-desc">Real African businesses using SOLSSA software to scale their operations and serve their customers better.</p>
        </div>
        <div className="clients-grid">
          {CLIENTS.map(c => (
            <div key={c.name} className="client-card">
              <div className="client-header">
                <div className="client-avatar">{c.logo}</div>
                <div>
                  <div className="client-name">{c.name}</div>
                  <div className="client-meta">{c.industry} · {c.location}</div>
                </div>
              </div>
              <span className="client-product-tag">{c.product}</span>
              <p className="client-desc">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="section-header" style={{ marginTop: "5rem", marginBottom: "0" }}>
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section about-bg">
        <div className="about-grid">
          <div className="about-text">
            <span className="section-label">About SOLSSA</span>
            <h2 className="section-title">Solutions for Africa,<br />Built in Africa.</h2>
            <p>SOLSSA — Solutions for Africa — is a software development and digital solutions company on a mission to empower African businesses with powerful, reliable, and scalable technology.</p>
            <p>We build our products with African business realities in mind: mobile-first, resilient networks, local payment systems, and the unique operational challenges of logistics and commerce across the continent.</p>
            <p>Our vision is to become the leading African provider of business automation software — helping SMEs, logistics operators, e-commerce businesses, and call centers compete and thrive.</p>
            <div className="about-values">
              {[
                { icon: "🌍", title: "Africa-First", desc: "Built for African markets, not adapted from foreign tools." },
                { icon: "⚡", title: "Reliability", desc: "99.9% uptime with systems that work even in tough conditions." },
                { icon: "🔧", title: "Customizable", desc: "Every business is different. We build to fit you." },
                { icon: "🤝", title: "Partnership", desc: "We grow when our clients grow. Long-term relationships." }
              ].map(v => (
                <div key={v.title} className="value-card">
                  <div className="value-icon">{v.icon}</div>
                  <div className="value-title">{v.title}</div>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <div className="africa-map">🌍</div>
            <div className="about-stat-row">
              {[["4+", "Countries"], ["3", "Core Products"], ["100+", "Clients"]].map(([n, l]) => (
                <div key={l} className="about-stat">
                  <div className="about-stat-num">{n}</div>
                  <div className="about-stat-label">{l}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.6 }}>
              Serving logistics, e-commerce, retail, beauty, and service businesses across East and West Africa.
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / QUOTE ── */}
      <section id="contact" className="section contact-bg">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-label">Get in Touch</span>
            <h3>Let's Build Something<br />Great Together</h3>
            <p>Ready to see how SOLSSA can transform your business? Fill in the form and our team will respond within 24 hours with a tailored demo and quotation.</p>

            {/* How Quotation Works */}
            <div className="quote-flow">
              <h4>💡 How the Quotation Process Works</h4>
              <div className="flow-steps">
                {[
                  ["1", "Submit your request — fill in the form with your business details and the product you need."],
                  ["2", "Our team reviews your submission and assesses the right solution for your scale."],
                  ["3", "We schedule a free demo call to walk you through the product live."],
                  ["4", "We send you a custom quotation based on your business size, volume, and requirements."],
                  ["5", "You approve, we onboard your team, and you're live — usually within days."]
                ].map(([n, t]) => (
                  <div key={n} className="flow-step">
                    <span className="flow-step-num">{n}</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-items">
              {[
                ["📧", "hello@solssa.com"],
                ["📞", "+254 700 000 000"],
                ["📍", "Nairobi, Kenya · Remote across Africa"],
                ["💬", "WhatsApp: +254 700 000 000"]
              ].map(([icon, text]) => (
                <div key={text} className="contact-item">
                  <div className="contact-item-icon">{icon}</div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">SOLSSA</div>
            <p className="footer-about">Solutions for Africa. Building reliable, scalable, and powerful software for businesses across the continent.</p>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="#">Courier Software</a></li>
              <li><a href="#">Call Center Solution</a></li>
              <li><a href="#">HRM System</a></li>
              <li><a href="#">Request Demo</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Digital Marketing</a></li>
              <li><a href="#">Website Development</a></li>
              <li><a href="#">SEO Optimization</a></li>
              <li><a href="#">Business Automation</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About SOLSSA</a></li>
              <li><a href="#">Our Clients</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 SOLSSA – Solutions for Africa. All rights reserved.</span>
          <span>Made with ❤️ for African businesses</span>
        </div>
      </footer>
    </>
  );
}
