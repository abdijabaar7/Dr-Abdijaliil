import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Orthopedic Surgery",
    "Orthopedic Doctor Mogadishu",
    "Dr. Abdijalii Abdiwahab Adan",
    "Bone Fracture Treatment",
    "Joint Replacement Somalia",
    "Sports Injury Mogadishu",
    "Knee Pain Specialist",
  ],
  authors: [{ name: siteConfig.doctor.name }],
  creator: siteConfig.doctor.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-white selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

