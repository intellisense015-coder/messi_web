import { ClipboardList } from "lucide-react";
import type { Service } from "../lib/services";

export default function ServiceRequirements({ service }: { service: Service }) {
  if (!service.requirements.length) return null;
  return <section className="service-section service-requirements" aria-labelledby="requirements-title"><div className="container"><div className="service-section-heading"><h2 id="requirements-title">The more context you can share, the more useful the first review can be.</h2></div><div className="requirements-grid">{service.requirements.map((item) => <article key={item}><ClipboardList size={19} /><p>{item}</p></article>)}</div></div></section>;
}
