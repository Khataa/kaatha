import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khaata - Simplify Debt Management for Local Merchants",
  description:
    "Khaata empowers local businesses with digital debt management. Enjoy secure digital ledgers, real-time notifications, automated reminders, easy transaction tracking, and customizable invoices.",
  keywords: [
    "Debt Management",
    "Digital Ledger",
    "Local Merchants",
    "Real-Time Notifications",
    "Automated Reminders",
    "Transaction Tracking",
    "Customizable Invoices"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Khaata - Simplify Debt Management for Local Merchants",
    description:
      "Empowering local businesses with digital debt management. Khaata offers secure digital ledgers, real-time notifications, automated reminders, and customizable invoices.",
    url: "https://yourdomain.com", // Replace with your actual domain
    siteName: "Khaata",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Khaata Landing Page"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Khaata - Simplify Debt Management for Local Merchants",
    description:
      "Empowering local businesses with digital debt management. Khaata offers secure digital ledgers, real-time notifications, automated reminders, and customizable invoices.",
    images: ["https://yourdomain.com/twitter-image.jpg"] // Replace with your actual image URL
  },
  alternates: {
    canonical: "https://yourdomain.com" // Replace with your actual domain
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}

