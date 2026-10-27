import type { Service } from "../lib/services";

export default function ServiceOverview({ service }: { service: Service }) {
  return <section className="service-section service-overview" aria-labelledby="overview-title"><div className="container service-two-column"><div><h2 id="overview-title">Support shaped around the situation you are actually facing.</h2></div><div className="service-copy"><p>{service.description}</p>{service.targetCustomer && <div className="service-fact"><span>Who it is for</span><strong>{service.targetCustomer}</strong></div>}{service.customerProblem && <div className="service-fact"><span>The problem we help unpack</span><strong>{service.customerProblem}</strong></div>}</div></div></section>;
}
