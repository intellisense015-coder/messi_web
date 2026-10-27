"use client";

import { Check, ClipboardList, FileBarChart, Inbox, MessageCircle, Search, Settings2 } from "lucide-react";
import type { Service } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import { ServiceFaqAccordion } from "./InteractiveServiceParts";
import Reveal from "./Reveal";
import { useState } from "react";

type TaskArea = {
  id: string;
  title: string;
  description: string;
  recommended: string;
  tasks: string[];
};

const taskAreas: TaskArea[] = [
  { id: "research", title: "Research", description: "Product, competitor, and supplier research.", recommended: "Task Support", tasks: ["Product research", "Competitor research", "Supplier research"] },
  { id: "operations", title: "Operations", description: "Inventory updates, order tracking, and routine admin.", recommended: "Operations Support", tasks: ["Inventory updates", "Order tracking", "Routine admin"] },
  { id: "customer-support", title: "Customer support", description: "Messages, follow-ups, and response management.", recommended: "Operations Support", tasks: ["Customer messages", "Follow-ups", "Issue tracking"] },
  { id: "growth", title: "Reporting and growth", description: "Lead research, reporting, and business development.", recommended: "Growth Support", tasks: ["Lead research", "Weekly reporting", "Growth support"] },
];

const supportAreas = [
  { id: "research", title: "Research", description: "Turn research requests into organized, review-ready information.", tasks: ["Product research", "Competitor notes", "Supplier checks"], icon: Search },
  { id: "operations", title: "Operations", description: "Keep recurring operational work organized and moving.", tasks: ["Inventory updates", "Order tracking", "Routine admin"], icon: Settings2 },
  { id: "customer-support", title: "Customer support", description: "Keep customer communication and follow-up work on track.", tasks: ["Customer messages", "Follow-ups", "Issue tracking"], icon: MessageCircle },
  { id: "reporting", title: "Reporting", description: "Create useful visibility around leads, work, and progress.", tasks: ["Lead research", "Weekly summary", "Progress notes"], icon: FileBarChart },
];

export function VirtualAssistantTaskSelector() {
  const [selected, setSelected] = useState<string[]>(["research"]);
  const selectedAreas = taskAreas.filter((area) => selected.includes(area.id));
  const activeTasks = selectedAreas.flatMap((area) => area.tasks).slice(0, 3);
  const recommended = selectedAreas.length > 1 ? "Operations Support" : selectedAreas[0]?.recommended || "Task Support";
  return <div className="va-task-selector"><div className="va-task-options" role="group" aria-label="Choose the work to delegate">{taskAreas.map((area) => { const Icon = area.id === "research" ? Search : area.id === "operations" ? Settings2 : area.id === "customer-support" ? MessageCircle : FileBarChart; const isSelected = selected.includes(area.id); return <button type="button" className={`va-task-option ${isSelected ? "is-selected" : ""}`} aria-pressed={isSelected} key={area.id} onClick={() => setSelected((current) => isSelected ? current.filter((item) => item !== area.id) : [...current, area.id])}><span className="va-task-icon"><Icon size={20} /></span><strong>{area.title}</strong><span>{area.description}</span>{isSelected && <Check className="va-task-check" size={17} aria-hidden="true" />}</button>; })}</div><div className="va-task-panel" aria-live="polite"><div><span className="va-panel-label">Selected work</span><h3>{selectedAreas.length ? selectedAreas.map((area) => area.title).join(" + ") : "Choose one or more areas"}</h3><span className="va-recommended">Recommended support: <strong>{recommended}</strong></span></div><ul>{(activeTasks.length ? activeTasks : ["Choose a work area to see example tasks."]).map((task) => <li key={task}><Check size={15} />{task}</li>)}</ul><a className="button button-primary" href="#service-enquiry">Build My Support Plan</a></div></div>;
}

export function VirtualAssistantWorkflow() {
  const steps = [
    { number: "01", title: "Share the tasks", description: "Tell us what needs to be handled.", icon: Inbox },
    { number: "02", title: "We organize the support", description: "We structure the workflow around your business.", icon: ClipboardList },
    { number: "03", title: "Work moves forward", description: "Your assistant completes tasks and keeps you updated.", icon: Check },
  ];
  return <Reveal><section className="va-workflow-section" aria-labelledby="va-workflow-title"><div className="container"><div className="interactive-section-title"><h2 id="va-workflow-title">Your assistant fits into the way you work.</h2></div><div className="va-workflow-grid">{steps.map((step) => { const Icon = step.icon; return <article className="va-workflow-step" key={step.title}><span className="va-workflow-number">{step.number}</span><div className="va-workflow-icon"><Icon size={21} /></div><h3>{step.title}</h3><p>{step.description}</p></article>; })}</div></div></section></Reveal>;
}

export function VirtualAssistantSupportAreas() {
  const [activeArea, setActiveArea] = useState("research");
  const active = supportAreas.find((area) => area.id === activeArea) || supportAreas[0];
  const ActiveIcon = active.icon;
  return <section className="va-support-section" aria-labelledby="va-support-title"><div className="container"><div className="interactive-section-title"><h2 id="va-support-title">What your assistant can take off your plate.</h2></div><div className="va-support-selector"><div className="va-support-tabs" role="tablist" aria-label="Assistant support areas">{supportAreas.map((area) => { const Icon = area.icon; return <button className={active.id === area.id ? "is-active" : ""} type="button" role="tab" aria-selected={active.id === area.id} key={area.id} onClick={() => setActiveArea(area.id)}><span className="va-support-icon"><Icon size={22} /></span><span>{area.title}</span></button>; })}</div><div className="va-support-task-visual" role="tabpanel" aria-live="polite"><div className="va-support-task-head"><div className="va-support-icon"><ActiveIcon size={23} /></div><div><span>Example task view</span><h3>{active.title}</h3></div></div><div className="va-support-task-list">{active.tasks.map((task, index) => <div className="va-support-task-card" key={task}><span>{String(index + 1).padStart(2, "0")}</span><strong>{task}</strong><i><Check size={14} /></i></div>)}</div></div></div></div></section>;
}

export function VirtualAssistantWorkboard() {
  const columns = [
    { title: "To review", className: "to-review", cards: [{ title: "Product research", className: "va-move-card" }] },
    { title: "In progress", className: "in-progress", cards: [{ title: "Customer follow-up", className: "" }, { title: "Inventory update", className: "" }] },
    { title: "Completed", className: "completed", cards: [{ title: "Weekly report", className: "va-complete-card" }] },
  ];
  return <section className="va-workboard-section" aria-labelledby="va-workboard-title"><div className="container"><div className="interactive-section-title"><h2 id="va-workboard-title">See the work, not just the promise.</h2></div><div className="va-workboard" aria-label="Example assistant workboard">{columns.map((column) => <div className={`va-workboard-column ${column.className}`} key={column.title}><div className="va-workboard-column-head"><strong>{column.title}</strong></div><div className="va-workboard-cards">{column.cards.map((card) => <article className={`va-workboard-card ${card.className}`} key={card.title}><span className="va-workboard-card-mark" aria-hidden="true" /><strong>{card.title}</strong><small>Example task</small></article>)}</div></div>)}</div></div></section>;
}

export function VirtualAssistantPackages() {
  const packages = [
    { title: "Basic", price: "$100", bestFor: "Focused, repeatable tasks.", tasks: ["Research", "Admin", "Supplier checks"], description: "A practical starting point for a clear list of work." },
    { title: "Standard", price: "$200", bestFor: "Daily e-commerce operations.", tasks: ["Inventory", "Customer support", "Admin"], description: "For recurring work that keeps your business moving.", featured: true },
    { title: "Growth", price: "$300", bestFor: "Lead research and reporting.", tasks: ["Leads", "Reporting", "Business development"], description: "For the research and visibility behind your next stage." },
  ];
  return <section className="va-packages-section" aria-labelledby="va-packages-title"><div className="container"><div className="interactive-section-title"><h2 id="va-packages-title">Support packages.</h2></div><div className="va-packages-grid">{packages.map((pkg) => <article className={`va-package-card ${pkg.featured ? "is-featured" : ""}`} key={pkg.title}>{pkg.featured && <span className="va-package-badge">Recommended</span>}<h3>{pkg.title}</h3><strong className="va-package-price">{pkg.price}</strong><div><span>Best for</span><strong>{pkg.bestFor}</strong></div><div><span>Includes</span><ul>{pkg.tasks.map((task) => <li key={task}>{task}</li>)}</ul></div><p>{pkg.description}</p><a className="button button-secondary" href="#service-enquiry">Discuss This Plan</a></article>)}</div></div></section>;
}

export default function VirtualAssistantServicePage({ service }: { service: Service }) {
  return <div className="service-content virtual-assistant-service-page"><section className="va-service-hero" aria-labelledby="va-service-title"><div className="container"><div className="va-service-hero-grid"><Reveal className="va-service-hero-copy"><h1 id="va-service-title">Delegate the Work Slowing Your Business Down.</h1><p>Flexible support for research, operations, customer service, and admin.</p><div className="service-hero-actions"><a className="button button-primary" href="#service-enquiry">Find My Assistant Fit</a><a className="button button-secondary" href="#va-task-selector">See What We Handle</a></div><span className="service-hero-reassurance">Flexible support · Clear tasks · Human-reviewed work</span></Reveal><Reveal className="va-service-hero-video" delay={100}><video autoPlay muted loop playsInline preload="metadata" aria-label="Desk-based virtual assistant workflow"><source src="/virtual-assistant-support-loop.mp4" type="video/mp4" /></video></Reveal></div></div></section><section className="va-task-section" id="va-task-selector" aria-labelledby="va-task-title"><div className="container"><div className="interactive-section-title"><h2 id="va-task-title">What should your assistant own?</h2><p>Select the work you want to delegate.</p></div><VirtualAssistantTaskSelector /></div></section><VirtualAssistantSupportAreas /><VirtualAssistantWorkflow /><VirtualAssistantWorkboard /><VirtualAssistantPackages /><section className="va-faq-section"><div className="container service-faq-layout"><div><h2>Common questions.</h2></div><ServiceFaqAccordion faqs={service.faqs} /></div></section><section className="va-helpful-section"><div className="container"><div className="va-helpful-card"><strong>Helpful to have</strong><span><Check size={15} />The tasks you want to delegate</span><span><Check size={15} />Tools or platforms involved</span><span><Check size={15} />Expected working hours</span><span><Check size={15} />Preferred communication method</span></div></div></section><InteractiveEnquiryPanel service={service} /></div>;
}
