"use client";

import { FileText, GitBranch, PackageCheck, ScanLine, Truck, Warehouse } from "lucide-react";
import type { ProcessStep, Service } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import { ServiceFaqAccordion, SituationSelector, type SituationOption } from "./InteractiveServiceParts";
import Reveal from "./Reveal";

const situations: SituationOption[] = [
  { id: "deactivated", label: "Account deactivated", summary: "Selling activity has stopped", focus: "Start by understanding the account situation and the inventory information available.", benefits: ["Review the current account context", "Organize the inventory facts", "Keep the next route grounded in evidence"], process: ["Share the account situation", "Review inventory information", "Discuss the next appropriate step"], cta: "Get My Inventory Assessment" },
  { id: "stranded", label: "Inventory is stranded", summary: "Stock needs a clear route", focus: "Bring together the inventory location, quantities, condition, and available documents before deciding what to do next.", benefits: ["Clarify where inventory is held", "Identify missing product details", "Consider suitable options after review"], process: ["Share the inventory basics", "Review the available options", "Plan the next action"], cta: "Get My Inventory Assessment" },
  { id: "exit", label: "Planning an exit", summary: "You need a practical plan", focus: "Build a clear view of the responsibilities, information, and costs involved in redirecting or liquidating stock.", benefits: ["Map the information required", "Understand practical constraints", "Prepare a decision-ready enquiry"], process: ["Explain the intended direction", "Review the constraints", "Agree the next enquiry step"], cta: "Get My Inventory Assessment" },
];

const pathSteps = [
  { number: "01", title: "Understand your inventory", description: "We review your stock, condition, quantity, and current situation.", icon: ScanLine },
  { number: "02", title: "Evaluate your options", description: "We identify the most practical route for your inventory.", icon: GitBranch },
  { number: "03", title: "Plan the next move", description: "You receive a clear action plan for moving forward.", icon: PackageCheck },
];

const supportAreas = [
  ["Inventory assessment", "Review inventory details, quantity, condition, and location.", Warehouse],
  ["Documentation guidance", "Identify the records needed for the next step.", FileText],
  ["Option planning", "Compare practical routes around your situation.", GitBranch],
  ["Ongoing coordination", "Keep track of agreed actions and open requirements.", Truck],
] as const;

const processSteps: ProcessStep[] = [
  { number: "01", title: "Share your situation", description: "Tell us what happened and share the basic inventory details." },
  { number: "02", title: "Review the options", description: "Understand the potential routes for your circumstances." },
  { number: "03", title: "Agree on a plan", description: "Clarify scope, responsibilities, costs, and requirements." },
  { number: "04", title: "Coordinate next steps", description: "Proceed with the agreed support and track open actions." },
];

export default function LiquidationLanding({ service }: { service: Service }) {
  return (
    <div className="liquidation-landing">
      <section className="liquidation-situation-section" id="liquidation-overview" aria-labelledby="liquidation-situation-title">
        <div className="container">
          <div className="liquidation-section-heading"><h2 id="liquidation-situation-title">Every inventory situation is different.</h2><p>Choose the situation closest to yours.</p></div>
          <SituationSelector options={situations} />
        </div>
      </section>

      <section className="liquidation-path-section" id="liquidation-path" aria-labelledby="liquidation-path-title">
        <div className="container">
          <div className="liquidation-section-heading"><h2 id="liquidation-path-title">A clearer path forward for your inventory.</h2><p>Assess the situation, compare your options, and take the next practical step.</p></div>
          <Reveal className="liquidation-path-reveal"><div className="liquidation-path-grid">{pathSteps.map(({ number, title, description, icon: Icon }) => <article className="liquidation-path-step" key={number}><span className="liquidation-path-icon"><Icon size={30} strokeWidth={1.6} /></span><span className="liquidation-step-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></Reveal>
        </div>
      </section>

      <section className="liquidation-support-section" aria-labelledby="liquidation-support-title">
        <div className="container"><div className="liquidation-section-heading"><h2 id="liquidation-support-title">The support you need, without the unnecessary complexity.</h2></div><div className="liquidation-support-grid">{supportAreas.map(([title, description, Icon]) => <article className="liquidation-support-card" key={title}><span className="liquidation-support-icon"><Icon size={21} strokeWidth={1.7} /></span><h3>{title}</h3><p>{description}</p></article>)}</div></div>
      </section>

      <section className="liquidation-process-section" aria-labelledby="liquidation-process-title">
        <div className="container"><div className="liquidation-section-heading"><h2 id="liquidation-process-title">A simple process.</h2></div><div className="liquidation-process-grid">{processSteps.map((step) => <article className="liquidation-process-card" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div>
      </section>

      <section className="liquidation-assessment-section" aria-labelledby="liquidation-assessment-title"><div className="container"><article className="liquidation-assessment-card"><h2 id="liquidation-assessment-title">Liquidation assessment</h2><p>Not sure what to do with your excess inventory? Get a practical assessment based on your stock and situation.</p><a className="button button-primary" href="#service-enquiry">Request an Assessment</a></article></div></section>

      <section className="liquidation-faq-section" aria-labelledby="liquidation-faq-title"><div className="container liquidation-faq-layout"><div className="liquidation-section-heading"><h2 id="liquidation-faq-title">Questions, answered clearly.</h2></div><ServiceFaqAccordion faqs={service.faqs} /></div></section>
      <InteractiveEnquiryPanel service={service} />
    </div>
  );
}
