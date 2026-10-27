import { FileText } from "lucide-react";
import type { Service } from "../lib/services";

export default function ServiceDocuments({ service }: { service: Service }) {
  if (!service.documents.length) return null;
  return <section className="service-section service-documents" aria-labelledby="documents-title"><div className="container service-two-column"><div><h2 id="documents-title">What to have ready.</h2></div><ul className="document-list">{service.documents.map((document) => <li key={document}><FileText size={18} /><span>{document}</span></li>)}</ul></div></section>;
}
