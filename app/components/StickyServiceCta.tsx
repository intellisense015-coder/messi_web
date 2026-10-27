import Link from "next/link";
import type { Service } from "../lib/services";

export default function StickyServiceCta({ service }: { service: Service }) {
  return <div className="sticky-service-cta"><span>{service.name}</span><Link className="button button-primary button-small" href="#service-enquiry">{service.ctaLabel}</Link></div>;
}
