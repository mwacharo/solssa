export const metadata = {
  title: "SOLSSA – Powerful Software Solutions for African Businesses",
  description:
    "SOLSSA builds reliable, scalable, and affordable software for logistics companies, e-commerce businesses, and service companies across Africa. Courier software, call center solutions, and HRM systems.",
  keywords:
    "African software, courier management system, call center software Africa, HRM system Kenya, logistics software Africa, SOLSSA",
  openGraph: {
    title: "SOLSSA – Solutions for Africa",
    description:
      "Powerful software built for African businesses. Courier, Call Center & HRM solutions.",
    url: "https://www.solssa.com",
    siteName: "SOLSSA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLSSA – Solutions for Africa",
    description: "Powerful software built for African businesses.",
  },
  metadataBase: new URL("https://www.solssa.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
