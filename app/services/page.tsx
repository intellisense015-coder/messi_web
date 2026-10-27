import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import Reveal from "../components/Reveal";
import ServiceGrid from "../components/ServiceGrid";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import WhatsAppWidget from "../components/WhatsAppWidget";
import { catalogueServices, PUBLIC_SITE_URL } from "../lib/services";

export const metadata: Metadata = {
  title: "Services | Messi Groups",
  description: "Explore Messi Groups service areas for Amazon sellers, e-commerce businesses, and growing brands.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Messi Groups", description: "Explore Messi Groups service areas for Amazon sellers, e-commerce businesses, and growing brands.", url: `${PUBLIC_SITE_URL}/services`, images: [{ url: "/hero-operations.png", alt: "Messi Groups e-commerce operations visual" }] },
  twitter: { card: "summary_large_image", title: "Services | Messi Groups", description: "Explore Messi Groups service areas for Amazon sellers, e-commerce businesses, and growing brands.", images: ["/hero-operations.png"] },
};

export default function ServicesPage() {
  return <main className="catalogue-page" id="top"><SiteHeader /><section className="catalogue-hero"><div className="container"><Reveal className="catalogue-hero-copy"><h1>Support for the next stage of your business.</h1><p>Explore the Messi Groups service options, then open a focused page when you are ready to share the situation behind your request.</p><div className="hero-actions"><Link className="button button-primary" href="#catalogue">Explore the catalogue</Link><a className="button button-secondary" href="https://wa.me/923244946911" target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp us</a></div></Reveal></div></section><section className="catalogue-intro" id="catalogue"><div className="container catalogue-intro-grid"><Reveal className="section-heading"><h2>One joined-up view of the work behind a stronger seller operation.</h2></Reveal><Reveal className="catalogue-intro-copy" delay={120}><p>Three service options have complete interactive detail pages. The remaining options stay intentionally concise until their content, pricing, and operational requirements are confirmed.</p><p className="catalogue-freeze-note">The current service content is centralized in `MESSI_GROUPS_CONTENT_FREEZE.md`.</p></Reveal></div></section><section className="services-section catalogue-services" aria-labelledby="catalogue-title"><div className="container"><Reveal className="services-heading"><div className="section-heading"><h2 id="catalogue-title">Choose where you need support.</h2></div><p>Open a detail page for scope, requirements, options, FAQs, and a focused enquiry.</p></Reveal><ServiceGrid services={catalogueServices} catalogue /></div></section><section className="catalogue-cta"><div className="container catalogue-cta-card"><div><h2>Tell us what is changing in your business.</h2><p>We can help you identify the most useful next conversation.</p></div><Link className="button button-primary" href="/#contact">Talk to Messi Groups</Link></div></section><SiteFooter /><WhatsAppWidget /></main>;
}
