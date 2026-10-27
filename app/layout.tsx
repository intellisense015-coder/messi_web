import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Messi Groups | E-commerce growth, solved",
  description: "Messi Groups helps Amazon sellers and e-commerce founders with account reinstatement, business formation, sourcing, tax support, and scalable growth solutions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://messigroups.com"),
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  openGraph: { type: "website", siteName: "Messi Groups", images: [{ url: "/hero-operations.png", alt: "Messi Groups e-commerce operations visual" }] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
