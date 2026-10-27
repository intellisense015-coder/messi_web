import type { Service } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import InteractiveServiceHero from "./InteractiveServiceHero";
import LiquidationLanding from "./LiquidationLanding";
import { ExpandableBenefitCard, GuidedDiagnostic, InteractiveProcessTimeline, InventoryLotVisualizer, InventorySnapshot, ReadinessChecklist, ReasonPills, ReviewTabs, ServiceFaqAccordion, ServiceOptionCard, SituationSelector, type SituationOption } from "./InteractiveServiceParts";
import ServiceDocuments from "./ServiceDocuments";
import StickyServiceCta from "./StickyServiceCta";
import RecoveryServicePage from "./RecoveryServicePage";
import VirtualAssistantServicePage from "./VirtualAssistantServicePage";
import LLCServicePage from "./LLCServicePage";
import USBankingServicePage from "./USBankingServicePage";
import SourcingServicePage from "./SourcingServicePage";
import ThreePlServicePage from "./ThreePlServicePage";
import AmazonCourseServicePage from "./AmazonCourseServicePage";

function getSituationOptions(service: Service): SituationOption[] {
  if (service.slug === "boost-business-scaling") return [
    { id: "sales", label: "Sales and growth", summary: "More consistent direction", focus: "Improve customer acquisition, offer structure, follow-ups, and growth planning.", benefits: ["Clarify priorities", "Review the current offer", "Map the next growth move"], process: ["Describe the bottleneck", "Review what is already working", "Choose a focused next step"], cta: "Request a scaling review" },
    { id: "operations", label: "Operations and systems", summary: "Less friction day to day", focus: "Organize the operating rhythm, responsibilities, and systems behind the work.", benefits: ["Find process gaps", "Clarify ownership", "Reduce decision friction"], process: ["Map the current workflow", "Prioritize the highest-friction area", "Agree the first improvement"], cta: "Discuss my operations" },
    { id: "sourcing", label: "Sourcing and supply", summary: "A clearer supply plan", focus: "Review the sourcing, inventory, and logistics decisions affecting the next stage.", benefits: ["Review supply constraints", "Understand sourcing options", "Plan around operational reality"], process: ["Share the current supply picture", "Review constraints", "Choose the next route to assess"], cta: "Review my supply plan" },
    { id: "ecommerce", label: "E-commerce and Amazon", summary: "Stronger marketplace support", focus: "Coordinate Amazon, catalogue, research, reporting, or white-label virtual assistant support.", benefits: ["Define the support scope", "Separate direct and white-label work", "Set useful reporting expectations"], process: ["Describe the workload", "Choose Amazon or white-label support", "Confirm onboarding requirements"], cta: "Discuss e-commerce support" },
  ];
  if (service.slug === "account-deactivation-reinstatement") return [
    { id: "deactivated", label: "Account deactivated", summary: "A notice needs review", focus: "Organize the notice, account history, and available evidence for a structured review.", benefits: ["Understand the stated issue", "Identify missing evidence", "Prepare the next appropriate response"], process: ["Share the notice", "Review the account information", "Discuss the next strategy"], cta: "Request a confidential review" },
    { id: "suspended", label: "Account suspended", summary: "Selling activity is restricted", focus: "Review the marketplace, restriction, previous communication, and documents available.", benefits: ["Capture the right marketplace context", "Review previous communication", "Keep sensitive information private"], process: ["Share the restriction", "Check document readiness", "Request missing information"], cta: "Review my account situation" },
    { id: "appeal", label: "Appeal or recovery support", summary: "A previous step stalled", focus: "Assess the appeal history and evidence before deciding what should happen next.", benefits: ["Organize previous appeals", "Compare responses", "Create a clearer follow-up brief"], process: ["Share previous appeals", "Review responses", "Agree the next review step"], cta: "Discuss my appeal history" },
  ];
  return [
    { id: "choose", label: "Help choosing a route", summary: "Not sure what fits", focus: "Start with the inventory facts and constraints, then assess the route that fits the situation.", benefits: ["Organize the essentials", "Review the available context", "Keep the route open until assessment"], process: ["Share inventory basics", "Review the information", "Discuss the next route"], cta: "Help me choose a route" },
    { id: "preferred", label: "I have a preferred route", summary: "You know the direction", focus: "Use your preferred route as a starting point while keeping the review grounded in the inventory details.", benefits: ["Capture your intended route", "Review fit and constraints", "Prepare the right follow-up"], process: ["Share the route", "Review the supporting facts", "Confirm the next step"], cta: "Discuss my preferred route" },
    { id: "valuation", label: "I want a valuation first", summary: "Value is the first question", focus: "Prepare the product, quantity, condition, location, and logistics information needed for review.", benefits: ["Avoid unsupported price promises", "Prepare useful product context", "Keep valuation review-based"], process: ["Share inventory details", "Organize lots where useful", "Assess the available evidence"], cta: "Start an inventory assessment" },
    { id: "logistics", label: "Warehouse or logistics support", summary: "Movement is the issue", focus: "Include warehouse, shipment, access, and timing information so the logistics context is visible early.", benefits: ["Capture location constraints", "Review movement requirements", "Discuss the operational route"], process: ["Share logistics details", "Review inventory context", "Discuss the appropriate support"], cta: "Discuss logistics support" },
  ];
}

const benefitDetails = [
  "Start with a focused view of the problem instead of trying to explain everything at once.",
  "Keep the next step grounded in the information and evidence available today.",
  "Use a configurable support path that can be refined during the enquiry.",
  "Move from public enquiry to a future internal case without exposing staff-only information.",
];

export default function ServicePageShell({ service }: { service: Service }) {
  const situations = getSituationOptions(service);
  const isBoost = service.slug === "boost-business-scaling";
  const isRecovery = service.slug === "account-deactivation-reinstatement";
  const isLiquidation = service.slug === "account-liquidation";
  const isLLC = service.slug === "llc-creation";
  const isBanking = service.slug === "us-physical-bank-account";
  const isSourcing = service.slug === "sourcing";
  const isThreePl = service.slug === "3pl-warehouse-services";
  const isCourse = service.slug === "amazon-course-mastery";
  const reviewTabs: Record<string, string[]> = isRecovery ? { "Account issue": ["What the notice says", "Current account status", "Issue duration"], Marketplace: ["Marketplace involved", "Account identifier", "Account context"], "Previous appeals": ["Appeal dates", "Previous responses", "What changed"], Notification: ["Screenshot or notice", "Relevant wording", "Date received"], "Supporting documents": ["Business documents", "Evidence available", "Missing information"] } : { "Seller information": ["Seller or company context", "Contact details", "Preferred follow-up"], "Product information": ["Product type", "Quantity", "Condition", "Product images and documents"], "Amazon information": ["Marketplace", "Seller information", "Account context where applicable"], "Financial information": ["Estimated value", "Financial documents where required", "Commercial constraints"], "Logistics information": ["Location", "Warehouse access", "Shipment or movement requirements"] };
  const packages = service.packages.filter((pkg) => pkg.isActive && (!isBoost || ["basic", "standard", "premium"].includes(pkg.id)));
  if (isLiquidation) return <><InteractiveServiceHero service={service} /><LiquidationLanding service={service} /></>;
  if (isRecovery) return <RecoveryServicePage service={service} />;
  if (isBoost) return <VirtualAssistantServicePage service={service} />;
  if (isLLC) return <LLCServicePage service={service} />;
  if (isBanking) return <USBankingServicePage service={service} />;
  if (isSourcing) return <SourcingServicePage service={service} />;
  if (isThreePl) return <ThreePlServicePage service={service} />;
  if (isCourse) return <AmazonCourseServicePage service={service} />;
  return <><InteractiveServiceHero service={service} /><div className="service-content"><section className="service-explorer" id="service-explorer"><div className="container"><div className="interactive-section-title"><h2>Choose the situation closest to yours.</h2><p>Explore a focused starting point without reading every detail at once.</p></div><SituationSelector options={situations} /></div></section>{isBoost && <section className="service-section service-diagnostic-section"><div className="container"><GuidedDiagnostic /></div></section>}{!isBoost && <section className="service-section service-tools-section"><div className="container">{isRecovery ? <><ReasonPills /><ReadinessChecklist title="Check your document readiness" showTimeline items={["You have your Amazon notification", "You know the marketplace involved", "You have your account identifier", "You have submitted an appeal before", "You have screenshots or supporting documents"]} /></> : <InventorySnapshot />}</div></section>}{!isBoost && !isRecovery && <section className="service-section service-tools-section"><div className="container"><InventoryLotVisualizer /></div></section>}<section className="service-section service-benefit-section"><div className="container"><div className="interactive-section-title"><h2>Explore the support areas.</h2><p>Open only the detail that is useful to you right now.</p></div><div className="benefit-disclosure-grid">{service.benefits.map((benefit, index) => <ExpandableBenefitCard key={benefit} index={index} title={benefit} detail={benefitDetails[index % benefitDetails.length]} />)}</div></div></section>{(isRecovery || !isBoost) && <section className="service-section service-tabs-section"><div className="container"><ReviewTabs tabs={reviewTabs} /></div></section>}{isBoost && <section className="service-section service-tabs-section"><div className="container"><div className="solution-areas"><div className="interactive-section-title"><h2>Choose a solution area.</h2><p>Keep the public page simple; reveal the scope when you need it.</p></div>{["Business scaling", "E-commerce growth", "Sourcing and operations", "Tax and business support"].map((area) => <details key={area}><summary>{area}<span>+</span></summary><p>This area can be shaped around your situation, the information available, and the next decision you need to make.</p><a className="text-link" href="#service-enquiry">Discuss this area</a></details>)}</div></div></section>}<section className="service-section service-process-section"><div className="container"><InteractiveProcessTimeline title={isBoost ? "Follow the growth roadmap" : isRecovery ? "Follow the case-review process" : "Follow the liquidation process"} steps={service.process} /></div></section><ServiceDocuments service={service} /><section className="service-section service-options-section"><div className="container"><div className="interactive-section-title"><h2>{isBoost ? "Choose a support package." : "Choose a starting option."}</h2><p>Nothing here promises a result or a fixed price. Final scope is confirmed after review.</p></div><div className="service-options-grid">{packages.map((pkg) => <ServiceOptionCard pkg={pkg} key={pkg.id} />)}</div></div></section><section className="service-section service-faq-section"><div className="container service-faq-layout"><div><h2>Questions, answered clearly.</h2></div><ServiceFaqAccordion faqs={service.faqs} /></div></section><InteractiveEnquiryPanel service={service} /></div>{!isLiquidation && <StickyServiceCta service={service} />}</>;
}
