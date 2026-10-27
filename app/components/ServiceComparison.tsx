import type { Service } from "../lib/services";

export default function ServiceComparison({ service }: { service: Service }) {
  if (!service.comparison?.length) return null;
  return <section className="service-section service-comparison" aria-labelledby="comparison-title"><div className="container"><div className="service-section-heading"><h2 id="comparison-title">Amazon VA and white-label VA, clearly separated.</h2></div><div className="comparison-table" role="table"><div className="comparison-row comparison-header" role="row"><span role="columnheader">Consideration</span><span role="columnheader">Amazon VA</span><span role="columnheader">White-label VA</span></div>{service.comparison.map((row) => <div className="comparison-row" role="row" key={row.label}><strong role="rowheader">{row.label}</strong><span role="cell">{row.amazon}</span><span role="cell">{row.whiteLabel}</span></div>)}</div></div></section>;
}
