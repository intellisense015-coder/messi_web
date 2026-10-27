"use client";

import { Building2, Check, CheckCircle2, ClipboardCheck, FileText, Landmark, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { Service } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import { ServiceFaqAccordion } from "./InteractiveServiceParts";
import Reveal from "./Reveal";

const readinessItems = [
  "Business details",
  "Identity information",
  "Business purpose",
  "Supporting documents",
  "Contact details",
];

const supportItems = [
  { title: "Business setup guidance", description: "Organize the business context behind the banking request.", icon: Building2 },
  { title: "Document preparation", description: "Prepare the records and details relevant to your situation.", icon: FileText },
  { title: "Application organization", description: "Keep the information clear, complete, and easy to review.", icon: ClipboardCheck },
  { title: "Requirement clarification", description: "Understand what may need confirmation before the next step.", icon: ShieldCheck },
];

const flowItems = [
  { number: "01", title: "Business profile", description: "Share what your business does and needs.", icon: Building2 },
  { number: "02", title: "Documents", description: "Gather the relevant identity and business records.", icon: FileText },
  { number: "03", title: "Review", description: "We help organize the information for review.", icon: ClipboardCheck },
  { number: "04", title: "Next step", description: "Understand what to clarify or prepare next.", icon: Landmark },
];

const processItems = [
  { number: "01", title: "Share your details", description: "Tell us about your business and account needs." },
  { number: "02", title: "Prepare the information", description: "We help organize the relevant details and documents." },
  { number: "03", title: "Understand the next step", description: "You receive clearer guidance based on your situation." },
];

export default function USBankingServicePage({ service }: { service: Service }) {
  const [checkedItems, setCheckedItems] = useState<string[]>(readinessItems.slice(0, 3));
  const readyCount = checkedItems.length;

  function toggleItem(item: string) {
    setCheckedItems((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  return <main className="bank-service-page">
    <section className="bank-hero bank-hero-full-bleed" aria-labelledby="bank-hero-title">
      <div className="bank-hero-background" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="/us-bank-setup-loop.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <div className="bank-hero-grid">
          <Reveal className="bank-hero-copy">
            <h1 id="bank-hero-title">Prepare for US Business Banking With Clarity.</h1>
            <p>Guided support for your business details, documents, and next steps.</p>
            <a className="button button-primary" href="#service-enquiry">Check My Setup</a>
            <span className="bank-hero-note">Final approval depends on the bank&apos;s requirements.</span>
          </Reveal>
        </div>
      </div>
    </section>

    <Reveal className="bank-flow-section" aria-labelledby="bank-flow-title">
      <div className="container">
        <div className="interactive-section-title"><h2 id="bank-flow-title">A clear banking setup flow.</h2></div>
        <div className="bank-flow-grid">
          <span className="bank-flow-line" aria-hidden="true" />
          {flowItems.map((item) => { const Icon = item.icon; return <article className="bank-flow-item" key={item.number}>
            <div className="bank-flow-icon"><Icon size={24} /></div>
            <span className="bank-flow-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>; })}
        </div>
      </div>
    </Reveal>

    <section className="bank-readiness-section" aria-labelledby="bank-readiness-title">
      <div className="container bank-readiness-grid">
        <Reveal className="bank-readiness-copy">
          <h2 id="bank-readiness-title">Know what to prepare.</h2>
          <p>Use this checklist as a starting point, not a universal bank requirement.</p>
          <span className="bank-disclaimer">Requirements may vary by bank and business type.</span>
        </Reveal>
        <Reveal className="bank-readiness-card" delay={100}>
          <div className="bank-readiness-heading"><div><strong>Document readiness</strong><span>{readyCount} of 5 items ready</span></div><CheckCircle2 size={22} /></div>
          <div className="bank-progress" aria-label={`${readyCount} of 5 items ready`}><span style={{ width: `${(readyCount / readinessItems.length) * 100}%` }} /></div>
          <div className="bank-checklist">{readinessItems.map((item) => <button type="button" className={checkedItems.includes(item) ? "is-checked" : ""} aria-pressed={checkedItems.includes(item)} key={item} onClick={() => toggleItem(item)}><span>{checkedItems.includes(item) && <Check size={14} />}</span>{item}</button>)}</div>
        </Reveal>
      </div>
    </section>

    <section className="bank-support-section" aria-labelledby="bank-support-title">
      <div className="container">
        <div className="interactive-section-title"><h2 id="bank-support-title">Support for the important details.</h2></div>
        <div className="bank-support-grid">{supportItems.map((item) => { const Icon = item.icon; return <article className="bank-support-card" key={item.title}><div className="bank-support-icon"><Icon size={25} /></div><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div>
      </div>
    </section>

    <Reveal className="bank-process-section" aria-labelledby="bank-process-title">
      <div className="container">
        <div className="interactive-section-title"><h2 id="bank-process-title">How the support works.</h2></div>
        <div className="bank-process-grid">
          <span className="bank-process-line" aria-hidden="true" />
          {processItems.map((item) => <article className="bank-process-card" key={item.number}><span className="bank-process-number">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
        </div>
      </div>
    </Reveal>

    <section className="bank-faq-section" aria-labelledby="bank-faq-title">
      <div className="container service-faq-layout"><div><h2 id="bank-faq-title">Common questions.</h2></div><ServiceFaqAccordion faqs={service.faqs} /></div>
    </section>

    <InteractiveEnquiryPanel service={service} />
  </main>;
}
