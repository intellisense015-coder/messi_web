import { MessageCircle } from "lucide-react";
import type { Service } from "../lib/services";
import ServiceEnquiryForm from "./ServiceEnquiryForm";

export default function ServiceEnquiryCta({ service }: { service: Service }) {
  const whatsappUrl = `https://wa.me/923244946911?text=${encodeURIComponent(service.whatsappMessage)}`;
  return <section className="service-enquiry-section" id="service-enquiry" aria-labelledby="enquiry-title"><div className="container"><div className="service-enquiry-card"><ServiceEnquiryForm service={service} /><div className="enquiry-whatsapp"><div><h3>Prefer a quick conversation?</h3><p>Share a short overview and we can point you toward the right service-specific next step.</p></div><a className="button button-secondary" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Message Messi Groups</a></div></div><p className="service-disclaimer"><strong>Please note:</strong> {service.disclaimer}</p></div></section>;
}
