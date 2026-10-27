import { ChevronDown } from "lucide-react";
import type { Service } from "../lib/services";

export default function ServiceFaqs({ service }: { service: Service }) {
  if (!service.faqs.length) return null;
  return <section className="service-section service-faqs" aria-labelledby="faqs-title"><div className="container service-two-column"><div><h2 id="faqs-title">Good questions deserve clear answers.</h2></div><div className="faq-list">{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronDown size={18} /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}
