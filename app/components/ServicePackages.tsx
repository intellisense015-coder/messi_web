import { ArrowRight, Check, Minus } from "lucide-react";
import Link from "next/link";
import type { Service, ServicePackage } from "../lib/services";

function pricingLabel(pkg: ServicePackage) {
  if (pkg.pricingMode === "fixed" && pkg.price) return `${pkg.currency || "USD"} ${pkg.price}`;
  if (pkg.pricingMode === "starting_from" && pkg.price) return `From ${pkg.currency || "USD"} ${pkg.price}`;
  if (pkg.pricingMode === "hidden") return "Discuss your requirements";
  return "Quote after review";
}

export default function ServicePackages({ service }: { service: Service }) {
  if (!service.packages.filter((pkg) => pkg.isActive).length) return null;
  return <section className="service-section service-packages" aria-labelledby="packages-title"><div className="container"><div className="service-section-heading service-packages-heading"><div><h2 id="packages-title">Start with the level of support that fits your brief.</h2></div><p>Package details remain configurable. When scope or pricing is not finalized, we will discuss the requirements with you.</p></div><div className="package-grid">{service.packages.filter((pkg) => pkg.isActive).sort((a, b) => a.displayOrder - b.displayOrder).map((pkg) => <article className={`package-card ${pkg.recommended ? "package-card-recommended" : ""}`} key={pkg.id}>{pkg.recommended && <span className="package-badge">Recommended</span>}<div className="package-card-top"><span className="package-name">{pkg.name}</span><span className="package-price">{pricingLabel(pkg)}</span></div><p>{pkg.description}</p>{pkg.workingHours && <div className="package-meta"><span>Hours</span><strong>{pkg.workingHours}</strong></div>}{pkg.teamSize && <div className="package-meta"><span>Team size</span><strong>{pkg.teamSize}</strong></div>}<div className="package-list"><span>Included scope</span>{pkg.includedTasks.length ? pkg.includedTasks.map((item) => <div key={item}><Check size={15} /> {item}</div>) : <div className="package-placeholder"><Minus size={15} /> Confirmed during consultation</div>}</div>{pkg.excludedTasks.length > 0 && <div className="package-list package-list-muted"><span>Not assumed</span>{pkg.excludedTasks.map((item) => <div key={item}><Minus size={15} /> {item}</div>)}</div>}<Link className="text-link" href="#service-enquiry">Discuss your requirements <ArrowRight size={16} /></Link></article>)}</div></div></section>;
}
