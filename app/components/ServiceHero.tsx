import { MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Service } from "../lib/services";
import ServiceBreadcrumbs from "./ServiceBreadcrumbs";

export default function ServiceHero({ service }: { service: Service }) {
  const whatsappUrl = `https://wa.me/923244946911?text=${encodeURIComponent(service.whatsappMessage)}`;
  return (
    <section className="service-hero" aria-labelledby="service-title">
      <div className="container">
        <ServiceBreadcrumbs serviceName={service.name} />
        <div className="service-hero-grid">
          <div className="service-hero-copy">
            <h1 id="service-title">{service.name}</h1>
            <p>{service.shortDescription}</p>
            <div className="service-hero-actions"><Link className="button button-primary" href="#service-enquiry">{service.ctaLabel}</Link><a className="button button-secondary" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp us</a></div>
          </div>
          <aside className="service-hero-note"><span className="service-note-label">A clearer next step</span><strong>{service.primaryOutcome}</strong><span className="service-price-label">{service.pricingMode === "quote_only" ? "Quote after review" : "Pricing to be confirmed"}</span></aside>
        </div>
      </div>
    </section>
  );
}
