import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import ServiceContentRenderer from "../../components/ServiceContentRenderer";
import WhatsAppWidget from "../../components/WhatsAppWidget";
import { getServiceBySlug, priorityServices, PUBLIC_SITE_URL } from "../../lib/services";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return priorityServices.flatMap((service) => [service.slug, ...(service.legacySlugs || [])].map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: service.seo.canonicalUrl },
    openGraph: { type: "website", title: service.seo.title, description: service.seo.description, url: `${PUBLIC_SITE_URL}${service.seo.canonicalUrl}`, images: [{ url: service.seo.ogImage, alt: `${service.name} - Messi Groups` }] },
    twitter: { card: "summary_large_image", title: service.seo.title, description: service.seo.description, images: [service.seo.ogImage] },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service || !service.isActive || !service.isPublished || service.isArchived) notFound();
  if (slug !== service.slug) redirect(`/services/${service.slug}`);

  const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: PUBLIC_SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${PUBLIC_SITE_URL}/services` }, { "@type": "ListItem", position: 3, name: service.name, item: `${PUBLIC_SITE_URL}${service.seo.canonicalUrl}` }] };
  const serviceJsonLd = { "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, serviceType: service.category, url: `${PUBLIC_SITE_URL}${service.seo.canonicalUrl}`, provider: { "@type": "Organization", name: "Messi Groups", url: PUBLIC_SITE_URL } };
  const faqJsonLd = service.faqs.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) } : null;

  return <main className="service-page" id="top"><SiteHeader /><ServiceContentRenderer service={service} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }} />{faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />}<SiteFooter /><WhatsAppWidget /></main>;
}
