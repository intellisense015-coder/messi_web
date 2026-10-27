import Reveal from "./Reveal";
import ServiceCard from "./ServiceCard";
import type { HomepageService } from "../lib/services";

export default function ServiceGrid({ services, catalogue = false }: { services: HomepageService[]; catalogue?: boolean }) {
  return <Reveal className="services-grid reveal-grid" delay={100}>{services.map((service) => <ServiceCard key={service.title} service={service} catalogue={catalogue} />)}</Reveal>;
}
