import type { Service } from "../lib/services";

export default function ServiceProcess({ service }: { service: Service }) {
  if (!service.process.length) return null;
  return <section className="service-section service-process" aria-labelledby="process-title"><div className="container"><div className="service-section-heading"><h2 id="process-title">A clear path from first message to next decision.</h2></div><div className="process-grid">{service.process.map((step) => <article className="process-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>;
}
