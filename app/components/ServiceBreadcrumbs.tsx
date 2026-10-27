import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ServiceBreadcrumbs({ serviceName }: { serviceName: string }) {
  return <nav className="service-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={14} /><Link href="/services">Services</Link><ChevronRight size={14} /><span aria-current="page">{serviceName}</span></nav>;
}
