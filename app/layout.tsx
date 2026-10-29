import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const tikTokSans = localFont({
  src: "./assets/fonts/TikTokSans-Variable.woff2",
  variable: "--font-tiktok-sans",
  display: "swap",
});

export const metadata: Metadata = {
  referrer: "no-referrer-when-downgrade",
  title: "Jean Paul — Mobile Developer",
  description: "Veja meus projetos, serviços e soluções digitais.",
  openGraph: {
    title: "Jean Paul — Mobile Developer",
    description: "Veja meus projetos, serviços e soluções digitais.",
    type: "website",
    images: ["https://origemjhanpoll.dev.br/tumblr.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://origemjhanpoll.dev.br/tumblr.jpg"],
  },
  other: {
    image: "https://origemjhanpoll.dev.br/tumblr.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={tikTokSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
