"use client";

import { Building2, Check, FileText, Landmark, MapPin, PenLine } from "lucide-react";
import { useState } from "react";
import type { Service } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import Reveal from "./Reveal";

const setupOptions = [
  { title: "Amazon business", description: "Create a clearer foundation for an Amazon or e-commerce operation.", next: "Start with your business activity, owner details, and operating goals." },
  { title: "US-based company", description: "Organize the early information for a US company setup.", next: "Start with the intended state, business name, and company purpose." },
  { title: "Business banking and operations", description: "Prepare the formation context needed before banking and operations planning.", next: "Start with how the company will operate and what it needs next." },
];

const includedItems = [
  { title: "Business name guidance", description: "Review practical business-name options for your intended activity.", icon: PenLine },
  { title: "State selection support", description: "Discuss state considerations based on your business context.", icon: MapPin },
  { title: "Document preparation", description: "Organize the information and records needed for the next step.", icon: FileText },
  { title: "Filing direction", description: "Understand the filing path and outstanding requirements.", icon: Landmark },
];

export function LLCSetupSelector() {
  const [selected, setSelected] = useState(0);
  const active = setupOptions[selected];
  return <div className="llc-selector"><div className="llc-selector-options" role="tablist" aria-label="What are you setting up?">{setupOptions.map((option, index) => <button className={`llc-selector-option ${selected === index ? "is-selected" : ""}`} key={option.title} type="button" role="tab" aria-selected={selected === index} onClick={() => setSelected(index)}><span className="llc-selector-icon"><Building2 size={20} /></span><strong>{option.title}</strong><span>{option.description}</span>{selected === index && <Check className="llc-selector-check" size={17} aria-hidden="true" />}</button>)}</div><div className="llc-selector-detail" role="tabpanel" aria-live="polite"><span>Recommended next step</span><h3>{active.title}</h3><p>{active.next}</p><a className="button button-primary" href="#service-enquiry">Start LLC Setup</a></div></div>;
}

export default function LLCServicePage({ service }: { service: Service }) {
  return <main className="service-content llc-service-page"><section className="llc-hero" aria-labelledby="llc-title"><div className="container"><div className="llc-hero-grid"><Reveal className="llc-hero-copy"><h1 id="llc-title">Set Up Your LLC With Clarity.</h1><p>A guided starting point for building your business foundation in the US.</p><a className="button button-primary" href="#llc-selector">Start Your LLC Setup</a></Reveal><Reveal className="llc-hero-visual" delay={100}><video autoPlay muted loop playsInline preload="metadata" aria-label="Business formation documents and setup workflow"><source src="/llc-setup-loop.mp4" type="video/mp4" /></video><div className="llc-hero-flow" aria-hidden="true"><span>Business idea</span><i>→</i><span>Documents</span><i>→</i><span>LLC foundation</span></div></Reveal></div></div></section><section className="llc-selector-section" id="llc-selector" aria-labelledby="llc-selector-title"><div className="container"><div className="interactive-section-title"><h2 id="llc-selector-title">What are you setting up?</h2></div><LLCSetupSelector /></div></section><Reveal className="llc-process-section" aria-labelledby="llc-process-title"><div className="container"><div className="interactive-section-title"><h2 id="llc-process-title">A simple path to filing.</h2></div><div className="llc-process-grid">{[{ number: "01", title: "Choose your structure", icon: Building2, description: "Share what you are setting up and the business context around it." }, { number: "02", title: "Prepare your documents", icon: FileText, description: "Organize the core information and records needed for the next step." }, { number: "03", title: "Move toward filing", icon: Check, description: "Review the filing direction and outstanding requirements." }].map((step) => { const Icon = step.icon; return <article className="llc-process-card" key={step.number}><span className="llc-process-number">{step.number}</span><div className="llc-process-icon"><Icon size={22} /></div><h3>{step.title}</h3><p>{step.description}</p></article>; })}</div></div></Reveal><section className="llc-included-section" aria-labelledby="llc-included-title"><div className="container"><div className="interactive-section-title"><h2 id="llc-included-title">What is included</h2></div><div className="llc-included-grid">{includedItems.map((item) => { const Icon = item.icon; return <article className="llc-included-card" key={item.title}><div className="llc-included-icon"><Icon size={25} /></div><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div></section><section className="llc-final-section" aria-labelledby="llc-final-title"><div className="container llc-final-shell"><div><h2 id="llc-final-title">Ready to create your business foundation?</h2><p>Requirements may vary by state and business type.</p></div><a className="button button-primary" href="#service-enquiry">Start LLC Setup</a></div></section><InteractiveEnquiryPanel service={service} /></main>;
}
