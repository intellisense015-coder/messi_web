"use client";

import type { Service, ProcessStep } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import { RecoveryProcessTimeline, RecoveryReviewPanel, SituationSelector, type SituationOption, ServiceFaqAccordion } from "./InteractiveServiceParts";
import InteractiveServiceHero from "./InteractiveServiceHero";
import Reveal from "./Reveal";

const situations: SituationOption[] = [
  {
    id: "deactivated",
    label: "Account deactivated",
    summary: "Selling activity has stopped",
    focus: "We review the deactivation notice, account history, previous appeals, and available supporting evidence.",
    benefits: ["Deactivation notice", "Account and policy history", "Previous appeal attempts", "Supporting evidence"],
    process: ["Share the notice", "Review the account information", "Discuss the next appropriate response"],
    cta: "Continue With This Situation",
  },
  {
    id: "suspended",
    label: "Account suspended",
    summary: "Selling access is restricted",
    focus: "We review the restriction, marketplace context, account history, and the information available to explain the situation.",
    benefits: ["Marketplace and account status", "Reason shown in the notice", "Evidence available", "Information still needed"],
    process: ["Share the restriction", "Check the supporting information", "Identify the next review step"],
    cta: "Continue With This Situation",
  },
  {
    id: "warning",
    label: "Policy warning received",
    summary: "An issue needs attention",
    focus: "We help you understand the warning, the policy concern, and the documentation that may be relevant to a response.",
    benefits: ["Policy wording", "Account activity", "Corrective information", "Response readiness"],
    process: ["Share the warning", "Review the context", "Prepare the next practical action"],
    cta: "Continue With This Situation",
  },
  {
    id: "rejected",
    label: "Appeal rejected",
    summary: "A previous appeal did not resolve it",
    focus: "We assess the previous appeal, the response received, and the evidence available before discussing a clearer next step.",
    benefits: ["Previous appeal wording", "Response history", "Evidence gaps", "Possible follow-up needs"],
    process: ["Share previous attempts", "Review the response", "Discuss the next appropriate strategy"],
    cta: "Continue With This Situation",
  },
];

const processSteps: ProcessStep[] = [
  { number: "01", title: "Submit your situation", description: "Tell us what happened and share the relevant notice." },
  { number: "02", title: "We review the case", description: "We examine the issue, account history, and available evidence." },
  { number: "03", title: "Receive your action plan", description: "We explain the gaps and recommended next steps." },
  { number: "04", title: "Move forward with clarity", description: "You can proceed with the next action confidently." },
];

export default function RecoveryServicePage({ service }: { service: Service }) {
  return <>
    <InteractiveServiceHero service={service} />
    <main className="service-content recovery-service-page">
      <section className="service-explorer recovery-situation-section" id="recovery-situations" aria-labelledby="recovery-situation-title">
        <div className="container">
          <div className="interactive-section-title"><h2 id="recovery-situation-title">Choose the situation closest to yours.</h2><p>Tell us what happened so we can show you the most relevant review areas.</p></div>
          <SituationSelector options={situations} />
        </div>
      </section>

      <RecoveryReviewPanel />

      <Reveal className="recovery-process-reveal">
        <RecoveryProcessTimeline steps={processSteps} />
      </Reveal>

      <section className="service-section service-faq-section recovery-faq-section" aria-labelledby="recovery-faq-title">
        <div className="container service-faq-layout"><div><h2 id="recovery-faq-title">Common questions.</h2></div><ServiceFaqAccordion faqs={service.faqs} /></div>
      </section>

      <InteractiveEnquiryPanel service={service} />
    </main>
  </>;
}
