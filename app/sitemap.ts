import type { MetadataRoute } from "next";
import { priorityServices, PUBLIC_SITE_URL } from "./lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: PUBLIC_SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }, { url: `${PUBLIC_SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 }, ...priorityServices.map((service) => ({ url: `${PUBLIC_SITE_URL}${service.seo.canonicalUrl}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: service.featured ? 0.8 : 0.7 }))];
}
