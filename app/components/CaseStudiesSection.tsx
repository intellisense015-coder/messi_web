"use client";

import Image from "next/image";
import { useState, TouchEvent } from "react";
import { Building2, PackageCheck, ShieldCheck } from "lucide-react";

type CaseStudy = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: typeof ShieldCheck;
  clientType: string;
  problem: string;
  whatWeDid: string;
  outcome: string;
  quote: string;
  client: string;
  role: string;
};

const caseStudies: CaseStudy[] = [
  { number: "01", title: "Account Management Support", description: "A demonstration case-study structure for an account issue.", image: "/hero-operations.png", alt: "E-commerce operations workspace used as a demo case-study image", icon: ShieldCheck, clientType: "Amazon seller — approval pending", problem: "Approved problem statement pending; no client situation is published here.", whatWeDid: "Approved Messi Groups service detail pending; replace with verified scope before launch.", outcome: "Approved outcome pending; no result is published here.", quote: "Approved client quote pending.", client: "Client name pending approval", role: "E-commerce seller" },
  { number: "02", title: "Sourcing & Logistics", description: "A demonstration case-study structure for sourcing and fulfilment.", image: "/hero-operations.png", alt: "Organized warehouse operations used as a demo case-study image", icon: PackageCheck, clientType: "Brand owner — approval pending", problem: "Approved problem statement pending; no client situation is published here.", whatWeDid: "Approved Messi Groups service detail pending; replace with verified scope before launch.", outcome: "Approved outcome pending; no result is published here.", quote: "Approved client quote pending.", client: "Client name pending approval", role: "Brand owner" },
  { number: "03", title: "Business Formation", description: "A demonstration case-study structure for business setup.", image: "/umais-headshot.png", alt: "Messi Groups founder image used as a demo business-formation image", icon: Building2, clientType: "New seller — approval pending", problem: "Approved problem statement pending; no client situation is published here.", whatWeDid: "Approved Messi Groups service detail pending; replace with verified scope before launch.", outcome: "Approved outcome pending; no result is published here.", quote: "Approved client quote pending.", client: "Client name pending approval", role: "New seller" },
];

const detailLabels = [["Client type", "clientType"], ["Problem", "problem"], ["What Messi Groups did", "whatWeDid"], ["Outcome", "outcome"]] as const;

export default function CaseStudiesSection() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const move = (direction: number) => setActive((current) => (current + direction + caseStudies.length) % caseStudies.length);
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => setTouchStart(event.touches[0]?.clientX ?? null);
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStart) - touchStart;
    if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <section className="case-studies-section" id="results" aria-labelledby="case-studies-title">
      <div className="container">
        <div className="case-studies-heading">
          <p className="case-studies-eyebrow">CLIENT SUCCESS STORIES</p>
          <h2 id="case-studies-title">Real business challenges. <span>Practical solutions.</span></h2>
          <p>From account issues to sourcing and business setup, we help e-commerce sellers solve complex problems and move forward with confidence.</p>
        </div>
        <div className="case-studies-carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button className="case-studies-control case-studies-prev" type="button" onClick={() => move(-1)} aria-label="Previous case study">Previous</button>
          <div className="case-studies-grid">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <article className={`case-study-card ${active === index ? "is-active" : ""}`} key={study.number}>
                  <div className="case-study-image-wrap"><Image src={study.image} alt={study.alt} fill sizes="(max-width: 960px) 90vw, 33vw" className="case-study-image" /><span className="case-study-number">{study.number}</span><span className="case-study-icon"><Icon size={21} /></span></div>
                  <div className="case-study-content"><span className="demo-label">Content placeholder — approval required</span><h3>{study.title}</h3><p>{study.description}</p><div className="case-study-points">{detailLabels.map(([label, key]) => <div key={label} className={`case-study-point ${key}`}><span aria-hidden="true" /><div><strong>{label}</strong><p>{study[key]}</p></div></div>)}</div><div className="case-study-testimonial"><span className="demo-label">Illustrative testimonial placeholder</span><p>“{study.quote}”</p><div><span className="case-study-avatar">—</span><span><strong>{study.client}</strong><small>{study.role}</small></span><em>DEMO CONTENT</em></div></div><button className="case-study-link" type="button" onClick={() => setExpanded(index)}>Read case study</button></div>
                </article>
              );
            })}
          </div>
          <button className="case-studies-control case-studies-next" type="button" onClick={() => move(1)} aria-label="Next case study">Next</button>
        </div>
        <div className="case-study-dots" aria-label="Case study pages">{caseStudies.map((study, index) => <button key={study.number} className={active === index ? "is-active" : ""} type="button" onClick={() => setActive(index)} aria-label={`Show case study ${study.number}`} aria-current={active === index ? "true" : undefined} />)}</div>
        <div className="trust-strip"><h3>What you can expect</h3><div><span>Confidential consultation</span><span>Practical seller support</span><span>Fast response</span><span>No-obligation assessment</span></div></div>
      </div>
      {expanded !== null ? <div className="case-study-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setExpanded(null)}><section className="case-study-modal" role="dialog" aria-modal="true" aria-labelledby="case-study-modal-title"><button className="dialog-close" type="button" onClick={() => setExpanded(null)}>Close</button><span className="demo-label">Demonstration content</span><h2 id="case-study-modal-title">{caseStudies[expanded].title}</h2><p>{caseStudies[expanded].description}</p><div className="case-study-modal-copy">{detailLabels.map(([label, key]) => <div key={label}><strong>{label}</strong><p>{caseStudies[expanded][key]}</p></div>)}</div><p className="modal-note">This illustrative case study is not a verified client result or endorsement.</p></section></div> : null}
    </section>
  );
}
