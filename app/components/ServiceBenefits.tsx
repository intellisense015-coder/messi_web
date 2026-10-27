import { CheckCircle2 } from "lucide-react";
import type { Service } from "../lib/services";

export default function ServiceBenefits({ service }: { service: Service }) {
  if (!service.benefits.length) return null;
  return <section className="service-section service-benefits" aria-labelledby="benefits-title"><div className="container"><div className="service-section-heading"><h2 id="benefits-title">A more practical way to move forward.</h2></div><div className="benefit-grid">{service.benefits.map((benefit) => <article key={benefit}><CheckCircle2 size={20} /><p>{benefit}</p></article>)}</div></div></section>;
}
