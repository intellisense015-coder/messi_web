"use client";

import { ArrowLeftRight, Check, FileText, PackageCheck, Route, Search, Truck, UploadCloud } from "lucide-react";
import { useState } from "react";
import type { Service } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import Reveal from "./Reveal";

const briefChoices = [
  { key: "product", label: "Product type", options: ["Apparel", "Home goods", "Beauty", "Other"] },
  { key: "quantity", label: "Quantity", options: ["100 units", "500 units", "1,000 units"] },
  { key: "destination", label: "Destination", options: ["USA", "UK", "UAE", "Other"] },
  { key: "quality", label: "Quality level", options: ["Standard", "Premium", "Custom requirements"] },
  { key: "transport", label: "Transport preference", options: ["Air", "Sea", "Need guidance"] },
] as const;

const organizeItems = [
  { title: "Product requirements", description: "Turn your product idea into a clearer sourcing brief.", icon: FileText },
  { title: "Supplier research", description: "Organize suitable supplier pathways around your brief.", icon: Search },
  { title: "Quote comparison", description: "Compare the details that shape a practical decision.", icon: ArrowLeftRight },
  { title: "Logistics planning", description: "Keep destination, transport, and movement considerations visible.", icon: Truck },
];

const workflowItems = [
  { number: "01", title: "Share your product brief", description: "Tell us what you need and where it needs to go.", icon: FileText },
  { number: "02", title: "Review sourcing options", description: "We organize suitable sourcing pathways.", icon: Search },
  { number: "03", title: "Compare requirements", description: "Review quantity, quality, lead time, and logistics considerations.", icon: ArrowLeftRight },
  { number: "04", title: "Confirm the next step", description: "Move forward with a clearer sourcing plan.", icon: Route },
];

const comparisonItems = [
  { id: "a", label: "Supplier option A", moq: "100 units", leadTime: "18 days" },
  { id: "b", label: "Supplier option B", moq: "250 units", leadTime: "12 days" },
  { id: "c", label: "Supplier option C", moq: "500 units", leadTime: "9 days" },
];

const requirementItems = [
  "Product specifications",
  "Quantity",
  "Destination",
  "Quality requirements",
  "Dimensions and weight",
  "Preferred transport mode",
];

export default function SourcingServicePage({ service }: { service: Service }) {
  const [brief, setBrief] = useState<Record<string, string>>({
    product: "Apparel",
    quantity: "500 units",
    destination: "USA",
    quality: "Premium",
    transport: "Need guidance",
  });
  const [selectedSupplier, setSelectedSupplier] = useState("b");
  const [selectedRequirements, setSelectedRequirements] = useState(requirementItems.slice(0, 3));
  const [uploadedFile, setUploadedFile] = useState("");

  function toggleRequirement(item: string) {
    setSelectedRequirements((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  return <main className="sourcing-service-page">
    <section className="sourcing-hero sourcing-hero-full-bleed" aria-labelledby="sourcing-hero-title">
      <div className="sourcing-hero-background" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="/sourcing-service-hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container sourcing-hero-container">
        <Reveal className="sourcing-hero-copy">
          <h1 id="sourcing-hero-title">Build a More Resilient Supply Plan.</h1>
          <p>Practical sourcing support around your product, quantity, quality, and destination.</p>
          <div className="sourcing-hero-actions"><a className="button button-primary" href="#service-enquiry">Start a Sourcing Request</a><a className="button button-secondary" href="#sourcing-workflow">See How It Works</a></div>
          <span className="sourcing-hero-note">Quote-based support · No guaranteed supplier outcome</span>
        </Reveal>
      </div>
    </section>

    <section className="sourcing-brief-section" id="sourcing-brief" aria-labelledby="sourcing-brief-title">
      <div className="container">
        <div className="interactive-section-title"><h2 id="sourcing-brief-title">What are you sourcing?</h2><p>Share the basics first. You can add more detail in the enquiry.</p></div>
        <div className="sourcing-brief-grid">
          <Reveal className="sourcing-brief-options">
            {briefChoices.map((choice) => <fieldset className="sourcing-choice-group" key={choice.key}><legend>{choice.label}</legend><div className="sourcing-choice-list">{choice.options.map((option) => <button type="button" key={option} className={brief[choice.key] === option ? "is-selected" : ""} aria-pressed={brief[choice.key] === option} onClick={() => setBrief((current) => ({ ...current, [choice.key]: option }))}>{brief[choice.key] === option && <Check size={14} />}{option}</button>)}</div></fieldset>)}
          </Reveal>
          <Reveal className="sourcing-brief-summary" delay={100}>
            <div className="sourcing-summary-heading"><div><span>Your sourcing brief</span><strong>Ready for a clearer review</strong></div><PackageCheck size={25} /></div>
            <dl>{briefChoices.slice(0, 4).map((choice) => <div key={choice.key}><dt>{choice.label}</dt><dd>{brief[choice.key]}</dd></div>)}</dl>
            <a className="button button-primary" href="#service-enquiry">Continue My Request</a>
          </Reveal>
        </div>
      </div>
    </section>

    <Reveal className="sourcing-workflow-section" id="sourcing-workflow" aria-labelledby="sourcing-workflow-title">
      <div className="container"><div className="interactive-section-title"><h2 id="sourcing-workflow-title">A clearer sourcing journey.</h2><p>Product brief to next practical step.</p></div><div className="sourcing-workflow-grid"><span className="sourcing-workflow-line" aria-hidden="true" />{workflowItems.map((item) => { const Icon = item.icon; return <article className="sourcing-workflow-item" key={item.number}><div className="sourcing-workflow-icon"><Icon size={25} /></div><span className="sourcing-workflow-number">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div>
    </Reveal>

    <section className="sourcing-organize-section" aria-labelledby="sourcing-organize-title">
      <div className="container"><div className="interactive-section-title"><h2 id="sourcing-organize-title">What we help organize.</h2><p>Keep the important sourcing details visible.</p></div><div className="sourcing-organize-grid">{organizeItems.map((item) => { const Icon = item.icon; return <article className="sourcing-organize-card" key={item.title}><div className="sourcing-organize-icon"><Icon size={25} /></div><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div>
    </section>

    <section className="sourcing-comparison-section" aria-labelledby="sourcing-comparison-title">
      <div className="container"><div className="interactive-section-title"><span className="sourcing-example-label">Example comparison view</span><h2 id="sourcing-comparison-title">Compare the important details.</h2><p>Illustrative options only. Actual availability and terms require review.</p></div><div className="sourcing-comparison-grid">{comparisonItems.map((item) => <button type="button" className={`sourcing-comparison-card ${selectedSupplier === item.id ? "is-selected" : ""}`} key={item.id} aria-pressed={selectedSupplier === item.id} onClick={() => setSelectedSupplier(item.id)}><div className="sourcing-comparison-head"><span>{item.label}</span>{selectedSupplier === item.id && <Check size={18} />}</div><div><small>MOQ</small><strong>{item.moq}</strong></div><div><small>Lead time</small><strong>{item.leadTime}</strong></div></button>)}</div></div>
    </section>

    <section className="sourcing-requirements-section" aria-labelledby="sourcing-requirements-title">
      <div className="container sourcing-requirements-grid"><Reveal className="sourcing-requirements-copy"><h2 id="sourcing-requirements-title">Share what matters.</h2><p>Select the details you already have ready.</p><div className="sourcing-requirement-chips">{requirementItems.map((item) => <button type="button" className={selectedRequirements.includes(item) ? "is-selected" : ""} aria-pressed={selectedRequirements.includes(item)} key={item} onClick={() => toggleRequirement(item)}>{selectedRequirements.includes(item) && <Check size={14} />}{item}</button>)}</div></Reveal><Reveal className="sourcing-upload-card" delay={100}><div className="sourcing-upload-icon"><UploadCloud size={26} /></div><h3>Optional file upload</h3><p>Add product images, specifications, quotations, or reference files.</p><label className="sourcing-upload-control"><span>{uploadedFile || "Choose a reference file"}</span><input type="file" accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv,.doc,.docx" onChange={(event) => setUploadedFile(event.target.files?.[0]?.name || "")} /></label><small>Files remain in this preview until protected storage is connected.</small></Reveal></div>
    </section>

    <InteractiveEnquiryPanel service={service} />
  </main>;
}
