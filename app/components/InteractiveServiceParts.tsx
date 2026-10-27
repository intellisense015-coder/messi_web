"use client";

import { ArrowRight, Check, ChevronDown, CircleCheck, FileText, History, ListChecks, Plus, ReceiptText, Search, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FAQ, ProcessStep, ServicePackage } from "../lib/services";

export type SituationOption = { id: string; label: string; summary: string; focus: string; benefits: string[]; process: string[]; cta: string };

export function SituationSelector({ options }: { options: SituationOption[] }) {
  const [selectedId, setSelectedId] = useState(options[0]?.id || "");
  const selected = options.find((option) => option.id === selectedId) || options[0];
  if (!selected) return null;
  return <div className="situation-selector"><div className="situation-options" role="tablist" aria-label="Choose your situation">{options.map((option) => <button type="button" role="tab" aria-selected={selected.id === option.id} className={`situation-option ${selected.id === option.id ? "is-selected" : ""}`} key={option.id} onClick={() => setSelectedId(option.id)}><strong>{option.label}</strong><span>{option.summary}</span>{selected.id === option.id && <span className="situation-option-check" aria-hidden="true"><Check size={15} /></span>}</button>)}</div><div className="situation-detail" role="tabpanel" key={selected.id}><div><span className="situation-detail-label">Focus</span><h3>{selected.focus}</h3></div><div className="situation-detail-columns"><div><span className="situation-detail-label">Relevant review areas</span><ul>{selected.benefits.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div><div><span className="situation-detail-label">What happens next</span><ul>{selected.process.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div></div><a className="text-link" href="#service-enquiry">{selected.cta}</a></div></div>;
}

export function ExpandableBenefitCard({ title, detail, index }: { title: string; detail: string; index: number }) {
  return <details className="benefit-disclosure"><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><ChevronDown size={17} /></summary><p>{detail}</p></details>;
}

export function InteractiveProcessTimeline({ steps, title = "Explore the process" }: { steps: ProcessStep[]; title?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];
  if (!active) return null;
  return <section className="interactive-timeline"><div className="interactive-section-title"><h2>{title}</h2><p>Choose a step to see what it means for your enquiry.</p></div><div className="timeline-controls" role="tablist" aria-label={title}>{steps.map((step, index) => <button type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? "is-active" : ""} key={step.number} onClick={() => setActiveIndex(index)}><span>{step.number}</span>{step.title}</button>)}</div><div className="timeline-detail" role="tabpanel"><strong>{active.title}</strong><p>{active.description}</p></div></section>;
}

export function ReadinessChecklist({ items, title = "Check your readiness", showTimeline = false }: { items: string[]; title?: string; showTimeline?: boolean }) {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));
  const [closedTime, setClosedTime] = useState(0);
  const count = checked.filter(Boolean).length;
  const timelineLabels = ["Just happened", "Within 1 month", "1–3 months ago", "3–6 months ago", "6+ months ago"];
  return <section className="readiness-checklist"><div className="interactive-section-title"><h2>{title}</h2><p>{count} of {items.length} review items ready</p></div><div className="readiness-track"><span style={{ width: `${items.length ? (count / items.length) * 100 : 0}%` }} /></div><div className="readiness-items">{items.map((item, index) => <label key={item}><input type="checkbox" checked={checked[index]} onChange={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span className="custom-check"><CircleCheck size={17} /></span><span>{item}</span></label>)}</div>{showTimeline && <div className="account-closed-timeline"><div className="timeline-label-row"><strong>Account closed time</strong><span>{timelineLabels[closedTime]}</span></div><input aria-label="Account closed time" type="range" min="0" max="4" step="1" value={closedTime} onChange={(event) => setClosedTime(Number(event.target.value))} /><div className="range-labels"><span>{timelineLabels[0]}</span><span>{timelineLabels.at(-1)}</span></div></div>}</section>;
}

export function ReasonPills() {
  const reasons = ["Policy or compliance notice", "Product or listing issue", "Performance concern", "Unknown or unclear reason"];
  const [selected, setSelected] = useState(reasons[0]);
  return <div className="reason-pills" aria-label="Reason for deactivation"><strong>What is closest to the issue?</strong><div role="list">{reasons.map((reason) => <button type="button" role="listitem" className={selected === reason ? "is-selected" : ""} key={reason} onClick={() => setSelected(reason)}>{reason}</button>)}</div></div>;
}

export function ServiceOptionCard({ pkg }: { pkg: ServicePackage }) {
  return <article className={`service-option-card ${pkg.recommended ? "is-recommended" : ""}`}>{pkg.recommended && <span className="option-badge">Recommended</span>}<div className="service-option-card-top"><h3>{pkg.name}</h3><strong>{pkg.pricingMode === "quote_only" ? "Discuss requirements" : "Price to be confirmed"}</strong></div><p>{pkg.description}</p>{pkg.supportItems?.length ? <div className="service-support-items"><span className="support-items-label">Possible support areas</span>{pkg.supportItems.map((item) => <span className="support-item" tabIndex={0} key={item.name}>{item.name}<span className="support-tooltip" role="tooltip">{item.explanation}</span></span>)}</div> : pkg.includedTasks.length ? <ul>{pkg.includedTasks.slice(0, 3).map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul> : <p className="option-placeholder">Scope is confirmed during the consultation.</p>}<a className="text-link" href="#service-enquiry">Choose this direction <ArrowRight size={16} /></a></article>;
}

export function ServiceFaqAccordion({ faqs }: { faqs: FAQ[] }) {
  return <div className="service-faq-accordion">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronDown size={18} /></summary><p>{faq.answer}</p></details>)}</div>;
}

export function GuidedDiagnostic() {
  const questions = [
    { prompt: "What is your biggest challenge?", options: ["Sales are inconsistent", "Business operations are disorganized", "I want to expand into Amazon or e-commerce", "Sourcing or supply is difficult", "I am unsure where to begin"] },
    { prompt: "What stage is your business in?", options: ["Starting", "Operating but stuck", "Growing quickly", "Expanding into a new market"] },
    { prompt: "What do you need first?", options: ["Strategy", "Systems", "Sourcing", "E-commerce support", "Ongoing business support"] },
  ];
  const [step, setStep] = useState(0);
  const complete = step >= questions.length;
  const choose = () => setStep((current) => current + 1);
  return <section className="guided-diagnostic"><div className="interactive-section-title"><h2>Find your starting point.</h2><p>Three quick choices help frame the first conversation. This is a guided lead tool, not a predictive score.</p></div>{complete ? <div className="diagnostic-result"><h3>Business Growth Review</h3><p>Your answers point toward a focused review of priorities, operating friction, and the support that would help you move forward.</p><a className="button button-primary" href="#service-enquiry">Discuss My Business</a><button className="text-button" type="button" onClick={() => setStep(0)}>Start again</button></div> : <div className="diagnostic-question"><div className="diagnostic-progress"><span style={{ width: `${(step / questions.length) * 100}%` }} /></div><strong>Question {step + 1} of {questions.length}</strong><h3>{questions[step].prompt}</h3><div className="diagnostic-options">{questions[step].options.map((option) => <button type="button" key={option} onClick={choose}>{option}</button>)}</div></div>}</section>;
}

export function ReviewTabs({ tabs }: { tabs: Record<string, string[]> }) {
  const names = Object.keys(tabs);
  const [active, setActive] = useState(names[0] || "");
  return <section className="review-tabs"><div className="interactive-section-title"><h2>What we review</h2><p>Open only the area you want to understand.</p></div><div className="review-tab-list" role="tablist">{names.map((name) => <button type="button" role="tab" aria-selected={active === name} className={active === name ? "is-active" : ""} key={name} onClick={() => setActive(name)}>{name}</button>)}</div><div className="review-tab-panel" role="tabpanel"><ul>{tabs[active]?.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div></section>;
}

const recoveryReviewTabs = [
  { title: "Account history", description: "Previous warnings, suspensions, and account activity.", items: ["Previous warnings", "Suspensions or restrictions", "Relevant account activity"] },
  { title: "Notice and policy issue", description: "The exact reason provided by Amazon.", items: ["Notice wording", "Policy or performance issue", "Date and marketplace"] },
  { title: "Supporting evidence", description: "Invoices, supplier details, shipping records, and business documents.", items: ["Supplier invoices", "Shipping records", "Business documents"] },
  { title: "Appeal readiness", description: "Whether the explanation and supporting documents are complete.", items: ["Previous appeal attempts", "Explanation of the issue", "Corrective action plan"] },
];

export function RecoveryReviewPanel() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState([true, true, true, false, false]);
  const [progressVisible, setProgressVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const readyCount = checked.filter(Boolean).length;
  const checklist = ["Deactivation notice", "Account details", "Supplier invoices", "Shipping records", "Corrective action plan"];
  const tab = recoveryReviewTabs[active];
  useEffect(() => {
    const node = progressRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setProgressVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const visualIcons = [<History key="history" />, <FileText key="notice" />, <ReceiptText key="evidence" />, <ListChecks key="ready" />];
  return <section className="service-section recovery-review-section" id="recovery-review" aria-labelledby="recovery-review-title"><div className="container"><div className="interactive-section-title"><h2 id="recovery-review-title">What We Review</h2><p>Open a review area to see what to prepare.</p></div><div className="recovery-review-grid"><div className="recovery-review-tabs" role="tablist" aria-label="What we review">{recoveryReviewTabs.map((item, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} key={item.title} onClick={() => setActive(index)}><strong>{item.title}</strong><span>{item.description}</span></button>)}</div><div className={`recovery-review-detail review-visual-state-${active}`} role="tabpanel" key={tab.title}><div className="recovery-review-detail-copy"><h3>{tab.title}</h3><p>{tab.description}</p><ul>{tab.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></div><div className="recovery-review-visual" aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata"><source src="/account-review-evidence-loop.mp4" type="video/mp4" /></video><div className="recovery-review-visual-card"><span className="recovery-review-visual-icon">{visualIcons[active]}</span><span className="recovery-review-visual-lines"><i /><i /><i /></span><span className="recovery-review-visual-checks"><Check /><Check /></span></div><Search className="recovery-review-search" /></div></div></div><div className="recovery-readiness" ref={progressRef}><div className="recovery-readiness-heading"><h3>Document readiness</h3><strong>{readyCount} of {checklist.length} items ready</strong></div><div className="recovery-readiness-track" aria-hidden="true"><span className={progressVisible ? "is-visible" : ""} style={{ width: progressVisible ? `${(readyCount / checklist.length) * 100}%` : "0%" }} /></div><div className="recovery-readiness-list">{checklist.map((item, index) => <label key={item}><input type="checkbox" checked={checked[index]} onChange={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span aria-hidden="true">{checked[index] ? "✓" : "○"}</span>{item}</label>)}</div></div></div></section>;
}

export function RecoveryProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return <section className="service-section recovery-process-section" aria-labelledby="recovery-process-title"><div className="container"><div className="interactive-section-title"><h2 id="recovery-process-title">How the case review works.</h2><p>A clear review from the first notice to the next practical action.</p></div><div className="recovery-process-grid">{steps.map((step) => <article className="recovery-process-card" key={step.number}><span className="recovery-process-number">{step.number}</span><div className="recovery-process-icon" aria-hidden="true"><CircleCheck size={21} /></div><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>;
}

type Snapshot = { location: string; sourcing: string; category: string; mode: "liquidate" | "sell" };
export function InventorySnapshot() {
  const [quantity, setQuantity] = useState(0);
  const [value, setValue] = useState(0);
  const [snapshot, setSnapshot] = useState<Snapshot>({ location: "", sourcing: "", category: "", mode: "liquidate" });
  const update = (key: keyof Snapshot, value: string) => setSnapshot((current) => ({ ...current, [key]: value }));
  const amountLabel = value ? `$${value.toLocaleString()}` : "Not added yet";
  return <section className="inventory-snapshot"><div className="interactive-section-title"><h2>Build a quick inventory snapshot.</h2><p>Choose a route, then share only the basics first. You can add supporting files later.</p></div><div className="liquidation-mode" role="tablist" aria-label="Choose an inventory route"><button type="button" role="tab" aria-selected={snapshot.mode === "liquidate"} className={snapshot.mode === "liquidate" ? "is-selected" : ""} onClick={() => update("mode", "liquidate")}>Liquidate Now</button><button type="button" role="tab" aria-selected={snapshot.mode === "sell"} className={snapshot.mode === "sell" ? "is-selected" : ""} onClick={() => update("mode", "sell")}>Sell Through Us</button></div><div className="snapshot-grid"><div className="snapshot-inputs"><label className="range-field">Inventory quantity<output>{quantity ? `${quantity.toLocaleString()} units` : "0 units"}</output><input type="range" min="0" max="1000" step="10" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label><label className="range-field">Estimated inventory amount<output>{amountLabel}</output><input type="range" min="0" max="100000" step="500" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label>Location<input value={snapshot.location} onChange={(event) => update("location", event.target.value)} placeholder="City and country" />{snapshot.location && <span className="snapshot-followup"><span>Sourcing Origin</span><input value={snapshot.sourcing} onChange={(event) => update("sourcing", event.target.value)} placeholder="Where the inventory came from" /></span>}</label><label>Product category<input value={snapshot.category} onChange={(event) => update("category", event.target.value)} placeholder="e.g. Apparel" /></label></div><div className="snapshot-card"><h3>Inventory snapshot</h3><div><span>Route</span><strong>{snapshot.mode === "liquidate" ? "Liquidate Now" : "Sell Through Us"}</strong></div><div><span>Quantity</span><strong>{quantity ? `${quantity.toLocaleString()} units` : "Not added yet"}</strong></div><div><span>Estimated value</span><strong>{amountLabel}</strong></div><div><span>Location</span><strong>{snapshot.location || "Not added yet"}</strong></div><div><span>Category</span><strong>{snapshot.category || "Not added yet"}</strong></div><p>Your inventory is ready for a structured review. We do not calculate a liquidation price here.</p></div></div></section>;
}

type Lot = { id: number; category: string; quantity: string; value: string };
export function InventoryLotVisualizer() {
  const [lots, setLots] = useState<Lot[]>([]);
  const addLot = () => setLots((current) => [...current, { id: Date.now(), category: "", quantity: "", value: "" }]);
  const updateLot = (id: number, key: keyof Omit<Lot, "id">, value: string) => setLots((current) => current.map((lot) => lot.id === id ? { ...lot, [key]: value } : lot));
  return <section className="lot-visualizer"><div className="interactive-section-title"><h2>Organize inventory into simple lots.</h2><p>Use this optional sketch to explain what you have. It does not calculate a liquidation price.</p><button type="button" className="button button-secondary button-small" onClick={addLot}><Plus size={16} /> Add a lot</button></div>{lots.length ? <div className="lot-grid">{lots.map((lot, index) => <article className="lot-card" key={lot.id}><div className="lot-card-head"><strong>Lot {String(index + 1).padStart(2, "0")}</strong><button type="button" aria-label={`Remove lot ${index + 1}`} onClick={() => setLots((current) => current.filter((item) => item.id !== lot.id))}><Trash2 size={16} /></button></div><label>Product category<input value={lot.category} onChange={(event) => updateLot(lot.id, "category", event.target.value)} placeholder="Category" /></label><label>Quantity<input value={lot.quantity} onChange={(event) => updateLot(lot.id, "quantity", event.target.value)} placeholder="Units" /></label><label>Estimated value<input value={lot.value} onChange={(event) => updateLot(lot.id, "value", event.target.value)} placeholder="Amount and currency" /></label></article>)}</div> : <div className="empty-lot-state">No lots added yet. Add one if it makes your enquiry easier to explain.</div>}</section>;
}
