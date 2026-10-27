"use client";

import { ArrowLeftRight, Building2, Check, ClipboardCheck, FileText, MapPin, PackageCheck, Route, Search, Truck } from "lucide-react";
import { useRef, useState } from "react";
import type { Service } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import Reveal from "./Reveal";

const needItems = [
  { title: "Inventory type", description: "Tell us what is arriving, moving, or being held so the facility context is clear.", icon: PackageCheck },
  { title: "Storage duration", description: "Share how long the inventory may need to stay before its next movement.", icon: Building2 },
  { title: "Inbound and outbound frequency", description: "Describe how often stock arrives and how often it needs to leave.", icon: Truck },
  { title: "Handling requirements", description: "Flag packing, labeling, fragile handling, or other operational needs.", icon: ClipboardCheck },
];

const supportItems = [
  { title: "Storage requirements", description: "Organize the space, duration, and handling details behind the request.", icon: Building2 },
  { title: "Inventory receiving", description: "Clarify what needs to happen when inventory arrives at a facility.", icon: PackageCheck },
  { title: "Inventory movement", description: "Plan the practical movement of stock between receiving and dispatch.", icon: ArrowLeftRight },
  { title: "Dispatch planning", description: "Keep outbound timing, destination, and preparation requirements visible.", icon: Truck },
];

const processItems = [
  { number: "01", title: "Share your inventory details", description: "Tell us what is moving and where it needs to go.", icon: FileText },
  { number: "02", title: "Review facility requirements", description: "We organize the requirements that shape facility fit.", icon: Search },
  { number: "03", title: "Plan storage and movement", description: "Clarify the expected receiving, storage, and dispatch flow.", icon: Route },
  { number: "04", title: "Confirm the next step", description: "Move forward with a clearer facility review.", icon: Check },
];

const fitChoices = [
  { key: "inventoryType", label: "Inventory type", options: ["General merchandise", "Apparel", "Fragile goods", "Other"] },
  { key: "quantity", label: "Estimated quantity", options: ["Up to 100 units", "100–500 units", "500+ units"] },
  { key: "duration", label: "Storage duration", options: ["Short term", "1–3 months", "Longer term"] },
  { key: "location", label: "Location", options: ["Pakistan", "United States", "Other / need guidance"] },
  { key: "frequency", label: "Inbound / outbound frequency", options: ["Occasional", "Weekly", "Frequent"] },
  { key: "handling", label: "Special handling needs", options: ["None noted", "Packing or labeling", "Needs review"] },
] as const;

const defaultFit = {
  inventoryType: "General merchandise",
  quantity: "100–500 units",
  duration: "1–3 months",
  location: "Other / need guidance",
  frequency: "Weekly",
  handling: "Needs review",
};

export default function ThreePlServicePage({ service }: { service: Service }) {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [activeVideoStep, setActiveVideoStep] = useState(0);
  const [selectedNeed, setSelectedNeed] = useState(0);
  const [fit, setFit] = useState<Record<string, string>>(defaultFit);

  function updateVideoStep(event: React.SyntheticEvent<HTMLVideoElement>) {
    const { currentTime, duration } = event.currentTarget;
    if (!duration) return;
    setActiveVideoStep(Math.min(2, Math.floor((currentTime / duration) * 3)));
  }

  return <main className="three-pl-service-page">
    <section className="three-pl-hero three-pl-hero-full-bleed" aria-labelledby="three-pl-hero-title">
      <div className="three-pl-hero-background" aria-hidden="true">
        <video ref={heroVideoRef} autoPlay muted loop playsInline preload="metadata" poster="/warehouse-movement-poster.jpg" onTimeUpdate={updateVideoStep}>
          <source src="/warehouse-movement-loop.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container three-pl-hero-container">
        <Reveal className="three-pl-hero-copy">
          <h1 id="three-pl-hero-title">Move Your Inventory With More Control.</h1>
          <p>Warehouse and inventory movement support when the right facility is required.</p>
          <div className="three-pl-hero-actions"><a className="button button-primary" href="#warehouse-fit">Check Warehouse Fit</a><a className="button button-secondary" href="#how-it-works">See How It Works</a></div>
          <div className="three-pl-video-steps" aria-label="Inventory movement stages"><span className={activeVideoStep === 0 ? "is-active" : ""}><i />Receive</span><span className={activeVideoStep === 1 ? "is-active" : ""}><i />Store</span><span className={activeVideoStep === 2 ? "is-active" : ""}><i />Move</span></div>
        </Reveal>
      </div>
    </section>

    <section className="three-pl-needs-section" aria-labelledby="three-pl-needs-title">
      <div className="container"><div className="interactive-section-title"><h2 id="three-pl-needs-title">What needs to move?</h2><p>Start with the operating detail that matters most.</p></div><div className="three-pl-needs-grid"><div className="three-pl-needs-list">{needItems.map((item, index) => { const Icon = item.icon; return <button type="button" className={`three-pl-need-card ${selectedNeed === index ? "is-selected" : ""}`} key={item.title} aria-pressed={selectedNeed === index} onClick={() => setSelectedNeed(index)}><span className="three-pl-need-icon"><Icon size={23} /></span><span><strong>{item.title}</strong><small>{selectedNeed === index ? item.description : "Open this detail"}</small></span>{selectedNeed === index && <Check size={18} />}</button>; })}</div><Reveal className="three-pl-need-detail"><div className="three-pl-detail-icon">{(() => { const Icon = needItems[selectedNeed].icon; return <Icon size={30} />; })()}</div><span>Selected focus</span><h3>{needItems[selectedNeed].title}</h3><p>{needItems[selectedNeed].description}</p></Reveal></div></div>
    </section>

    <Reveal className="three-pl-process-section" id="how-it-works" aria-labelledby="three-pl-process-title">
      <div className="container"><div className="interactive-section-title"><h2 id="three-pl-process-title">How the support works.</h2><p>From inventory details to a clearer facility review.</p></div><div className="three-pl-process-grid"><span className="three-pl-process-line" aria-hidden="true" />{processItems.map((item) => { const Icon = item.icon; return <article className="three-pl-process-item" key={item.number}><div className="three-pl-process-icon"><Icon size={24} /></div><span className="three-pl-process-number">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div>
    </Reveal>

    <section className="three-pl-support-section" aria-labelledby="three-pl-support-title">
      <div className="container"><div className="interactive-section-title"><h2 id="three-pl-support-title">What we help organize.</h2><p>Keep the movement plan clear and practical.</p></div><div className="three-pl-support-grid">{supportItems.map((item) => { const Icon = item.icon; return <article className="three-pl-support-card" key={item.title}><div className="three-pl-support-icon"><Icon size={25} /></div><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div>
    </section>

    <section className="three-pl-fit-section" id="facility-fit" aria-labelledby="three-pl-fit-title">
      <div className="container"><div className="interactive-section-title"><h2 id="three-pl-fit-title">Find the right facility fit.</h2><p>Answer a few practical questions before the review.</p></div><div className="three-pl-fit-grid"><Reveal className="three-pl-fit-options">{fitChoices.map((choice) => <fieldset className="three-pl-fit-group" key={choice.key}><legend>{choice.label}</legend><div>{choice.options.map((option) => <button type="button" key={option} className={fit[choice.key] === option ? "is-selected" : ""} aria-pressed={fit[choice.key] === option} onClick={() => setFit((current) => ({ ...current, [choice.key]: option }))}>{fit[choice.key] === option && <Check size={14} />}{option}</button>)}</div></fieldset>)}</Reveal><Reveal className="three-pl-fit-summary" delay={100}><div className="three-pl-fit-summary-icon"><MapPin size={25} /></div><span>Your facility-fit summary</span><strong>Ready for a review</strong><dl>{fitChoices.slice(0, 4).map((choice) => <div key={choice.key}><dt>{choice.label}</dt><dd>{fit[choice.key]}</dd></div>)}</dl><a className="button button-primary" href="#warehouse-fit">Request a Facility Review</a></Reveal></div></div>
    </section>

    <InteractiveEnquiryPanel service={service} />
  </main>;
}
