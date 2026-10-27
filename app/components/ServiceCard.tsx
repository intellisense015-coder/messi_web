import Link from "next/link";
import { Building2, GraduationCap, Landmark, PackageCheck, ReceiptText, ShieldCheck, TrendingUp } from "lucide-react";
import type { HomepageService } from "../lib/services";

const iconMap = { PackageCheck, ShieldCheck, TrendingUp, ReceiptText, Building2, Landmark, GraduationCap };

export default function ServiceCard({ service, catalogue = false }: { service: HomepageService; catalogue?: boolean }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] || PackageCheck;
  const anchorId = service.href.includes("#") ? service.href.split("#")[1] : undefined;
  return (
    <article id={anchorId} className={`service-card ${service.featured ? "service-card-featured" : ""}`}>
      <div className="service-card-top"><span className="service-number">{service.number}</span><Icon size={30} strokeWidth={1.7} /></div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <Link href={service.href} aria-label={`${catalogue && service.featured ? "View details for" : "Learn more about"} ${service.title}`}>{catalogue && service.featured ? "View details" : "Learn more"}</Link>
    </article>
  );
}
