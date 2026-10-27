export type PricingMode = "fixed" | "starting_from" | "quote_only" | "hidden";

export type ServiceFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "select"
  | "textarea"
  | "file";

export type ServiceField = {
  id: string;
  label: string;
  type: ServiceFieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  accept?: string;
  multiple?: boolean;
  sensitive?: boolean;
  condition?: { field: string; equals?: string; includes?: string };
};

export type ProcessStep = { number: string; title: string; description: string };
export type FAQ = { question: string; answer: string };

export type ServicePackage = {
  id: string;
  name: string;
  description: string;
  includedTasks: string[];
  excludedTasks: string[];
  workingHours?: string;
  teamSize?: string;
  responseExpectations?: string;
  reportingFrequency?: string;
  toolsIncluded?: string[];
  onboardingRequirements?: string[];
  supportItems?: { name: string; explanation: string }[];
  price?: number;
  currency?: "USD" | "PKR";
  pricingMode: PricingMode;
  recommended?: boolean;
  displayOrder: number;
  isActive: boolean;
};

export type ServiceSEO = {
  title: string;
  description: string;
  ogImage: string;
  canonicalUrl: string;
};

export type ServiceComparisonRow = {
  label: string;
  amazon: string;
  whiteLabel: string;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  legacySlugs?: string[];
  category: string;
  shortDescription: string;
  description: string;
  targetCustomer?: string;
  customerProblem?: string;
  primaryOutcome?: string;
  benefits: string[];
  process: ProcessStep[];
  requirements: string[];
  documents: string[];
  packages: ServicePackage[];
  formFields: ServiceField[];
  faqs: FAQ[];
  pricingMode: PricingMode;
  currency?: "USD" | "PKR";
  startingPrice?: number;
  featured: boolean;
  isActive: boolean;
  isPublished: boolean;
  isArchived: boolean;
  sortOrder: number;
  disclaimer: string;
  ctaLabel: string;
  whatsappMessage: string;
  seo: ServiceSEO;
  comparison?: ServiceComparisonRow[];
};

export type HomepageService = {
  number: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  featured?: boolean;
};

export type ServiceCategory = {
  id: string;
  number: string;
  label: string;
  description: string;
  icon: string;
  detailServiceSlugs: string[];
};

const fileTypes = ".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv,.doc,.docx";

export const priorityServices: Service[] = [
  {
    id: "account-liquidation",
    name: "Account Liquidation and Inventory Services",
    slug: "account-liquidation",
    category: "Inventory Liquidation",
    shortDescription: "Review, organize, value, and plan a practical route for Amazon-related inventory or other stock.",
    description:
      "Messi Groups helps sellers and businesses understand their available inventory, organize information into workable lots, and assess liquidation routes. The final route, valuation, and quotation depend on the inventory details and operational review completed after enquiry.",
    targetCustomer: "Amazon sellers, brands, distributors, and businesses holding stock that needs a clearer commercial route.",
    customerProblem: "Slow-moving, stranded, excess, or operationally complicated inventory can tie up cash and make the next decision difficult.",
    primaryOutcome: "A structured inventory assessment and a recommended next step based on the details you provide.",
    benefits: [
      "A clearer view of what inventory is available and how it can be organized.",
      "A review framework covering product, seller, financial, document, and logistics information.",
      "Liquidation options that are assessed against the inventory details rather than a generic promise.",
      "A structured enquiry that can move into a future internal case and quotation workflow.",
    ],
    process: [
      { number: "01", title: "Submit inventory details", description: "Tell us what you have, where it is, and what route you are considering." },
      { number: "02", title: "Upload supporting information", description: "Share available spreadsheets, product documents, images, or financial context." },
      { number: "03", title: "Messi Groups reviews the inventory", description: "We review the information provided and identify missing details where needed." },
      { number: "04", title: "Organize lots where required", description: "Inventory can be structured into workable lots for further assessment." },
      { number: "05", title: "Assess value and options", description: "Valuation and liquidation routes are considered from the operational information available." },
      { number: "06", title: "Share a recommended route", description: "A quotation or recommended next step is prepared for your consideration." },
      { number: "07", title: "Confirm the next step", description: "You decide whether and how to move forward." },
      { number: "08", title: "Move into execution", description: "Approved work can progress into the appropriate operational workflow." },
    ],
    requirements: [
      "A reasonably complete inventory overview, even if it is initially approximate.",
      "Your preferred liquidation route and any commercial constraints.",
      "Accurate contact and location information for follow-up.",
    ],
    documents: [
      "Inventory spreadsheets or stock lists",
      "Product images and product documents",
      "Amazon or seller information, if applicable",
      "Financial documents, if required for the review",
      "Logistics, warehouse, or shipment information where relevant",
    ],
    packages: [
      {
        id: "liquidation-assessment",
        name: "Liquidation assessment",
        description: "A quote-only review of your inventory details and the most suitable next step.",
        includedTasks: ["Inventory information review", "Route assessment", "Follow-up questions where required"],
        excludedTasks: ["Guaranteed valuation", "Automatic purchase of inventory", "Logistics execution before approval"],
        pricingMode: "quote_only",
        displayOrder: 1,
        isActive: true,
      },
    ],
    formFields: [
      { id: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
      { id: "companyName", label: "Company name", type: "text", placeholder: "Company or brand" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { id: "phone", label: "Phone number", type: "tel", required: true, placeholder: "+92 ..." },
      { id: "country", label: "Country", type: "text", required: true, placeholder: "Country" },
      { id: "preferredContactMethod", label: "Preferred contact method", type: "select", required: true, options: ["Email", "Phone", "WhatsApp"] },
      { id: "inventoryType", label: "Inventory type", type: "select", required: true, options: ["Amazon inventory", "Other physical inventory", "Not sure yet"] },
      { id: "inventoryQuantity", label: "Quantity of inventory", type: "number", required: true, placeholder: "Approximate units" },
      { id: "estimatedInventoryValue", label: "Estimated inventory value", type: "text", placeholder: "Amount and currency" },
      { id: "inventoryLocation", label: "Inventory location", type: "select", required: true, options: ["Amazon fulfillment center", "Third-party warehouse", "My own location", "Other location"] },
      { id: "inventorySource", label: "Inventory sourcing", type: "select", required: true, options: ["Manufacturer", "Wholesale supplier", "Private label", "Retail arbitrage", "Other"] },
      { id: "productCategory", label: "Product category", type: "text", placeholder: "Product category" },
      { id: "productDetails", label: "Product details", type: "textarea", placeholder: "SKU count, condition, age, packaging, or other useful context" },
      { id: "amazonMarketplace", label: "Amazon marketplace", type: "text", placeholder: "e.g. Amazon US", condition: { field: "inventoryType", equals: "Amazon inventory" } },
      { id: "sellerInformation", label: "Seller or account information", type: "textarea", placeholder: "Share only information needed for the review", condition: { field: "inventoryType", equals: "Amazon inventory" }, sensitive: true },
      { id: "preferredLiquidationRoute", label: "Desired service", type: "select", required: true, options: ["Liquidate Now", "Sell Through Us"] },
      { id: "productImages", label: "Product images", type: "file", accept: fileTypes, multiple: true, condition: { field: "physicalInventory", equals: "yes" }, helpText: "Files stay local to this form until a secure upload endpoint is connected." },
      { id: "inventorySpreadsheets", label: "Inventory spreadsheets", type: "file", accept: fileTypes, multiple: true },
      { id: "productDocuments", label: "Product documents", type: "file", accept: fileTypes, multiple: true },
      { id: "financialDocuments", label: "Financial documents, if required", type: "file", accept: fileTypes, multiple: true, sensitive: true },
      { id: "logisticsInformation", label: "Logistics information", type: "textarea", placeholder: "Warehouse access, shipment constraints, pickup requirements", condition: { field: "preferredLiquidationRoute", includes: "Warehouse" } },
      { id: "physicalInventory", label: "Is physical inventory available now?", type: "select", options: ["yes", "no", "not_sure"] },
      { id: "additionalNotes", label: "Additional notes", type: "textarea", placeholder: "Anything else we should know?" },
    ],
    faqs: [
      { question: "What is Amazon account liquidation support?", answer: "It is a structured review of your inventory situation, account context, available records, and practical options. The suitable route depends on the information and current platform or logistics rules." },
      { question: "What information should I prepare?", answer: "Start with your approximate quantity, inventory location, sourcing origin, product category, account context where relevant, and the service direction you are considering. Supporting files can be added when available." },
      { question: "What options may be available for my inventory?", answer: "Depending on your circumstances, the review may consider removal, transfer, liquidation, or another suitable route. We do not confirm a route before reviewing the details." },
      { question: "How does the assessment process work?", answer: "You share the basics first. Messi Groups reviews the information, identifies missing details, and discusses a proposed scope, responsibilities, and next action." },
      { question: "How are service fees determined?", answer: "Fees depend on the inventory quantity, location, account circumstances, scope, and operational requirements. Pricing is assessment-based rather than a generic public price." },
      { question: "Can you guarantee account reinstatement or inventory recovery?", answer: "No. Account decisions, inventory outcomes, platform rules, valuations, and recovery amounts are outside our control. We provide review, guidance, and coordination based on the information available." },
    ],
    pricingMode: "quote_only",
    featured: true,
    isActive: true,
    isPublished: true,
    isArchived: false,
    sortOrder: 1,
    disclaimer: "Liquidation routes, valuation, and quotations are subject to the inventory details, condition, location, and operational review. No outcome or price is guaranteed before assessment.",
    ctaLabel: "Request a liquidation assessment",
    whatsappMessage: "Hello Messi Groups, I would like to request an inventory liquidation assessment.",
    seo: { title: "Account Liquidation & Inventory Services | Messi Groups", description: "Get a structured review of Amazon-related inventory or other stock, with liquidation routes assessed around your details.", ogImage: "/hero-operations.png", canonicalUrl: "/services/account-liquidation" },
  },
  {
    id: "amazon-account-recovery",
    name: "Account Deactivation & Reinstatement Support",
    slug: "account-deactivation-reinstatement",
    legacySlugs: ["amazon-account-recovery"],
    category: "Account Deactivation & Reinstatement Support",
    shortDescription: "Confidential review, appeal preparation, and recovery guidance for Amazon account issues.",
    description: "When an Amazon account is deactivated or its health is under pressure, the next step should be based on the notice, account history, and available evidence. Messi Groups provides structured support for review, appeal preparation, and recovery guidance without promising a guaranteed outcome.",
    targetCustomer: "Amazon sellers, operators, and businesses dealing with deactivation notices, account-health issues, or a stalled appeal.",
    customerProblem: "Account notices can be unclear, previous appeals may not have addressed the underlying concern, and sensitive evidence can be difficult to organize.",
    primaryOutcome: "A confidential assessment of your situation and a clearer evidence-led next step.",
    benefits: ["A structured first review of the account situation and available evidence.", "Support organizing the information needed for appeal preparation.", "Guidance that reflects the stated issue rather than generic recovery wording.", "A private, service-specific enquiry path for sensitive files and screenshots."],
    process: [
      { number: "01", title: "Share the account situation", description: "Tell us what happened, when it happened, and which marketplace is affected." },
      { number: "02", title: "Provide relevant evidence", description: "Upload the notice, previous appeals, responses, and supporting account documents securely when the upload flow is connected." },
      { number: "03", title: "Initial case review", description: "Messi Groups reviews the information and identifies gaps or follow-up questions." },
      { number: "04", title: "Prepare a response strategy", description: "Where appropriate, we help structure the information and next-step guidance." },
      { number: "05", title: "Track progress", description: "The future operations workflow can track document requests, communications, and status changes." },
    ],
    requirements: ["The deactivation notice or account-health notification.", "A clear description of the issue and what has already been tried.", "Dates and copies of previous appeals or responses, where available.", "Accurate contact information for confidential follow-up."],
    documents: ["Notification screenshots or notices", "Previous appeals and appeal dates", "Previous responses from Amazon", "Relevant account and business documents", "Other evidence that helps explain the account situation"],
    packages: [{ id: "confidential-review", name: "Confidential account review", description: "A quote-only assessment of the account issue, evidence, and possible next steps.", includedTasks: ["Initial information review", "Evidence gap assessment", "Next-step guidance"], excludedTasks: ["Guaranteed reinstatement", "Guaranteed response from Amazon", "Direct Amazon API automation"], pricingMode: "quote_only", displayOrder: 1, isActive: true }],
    formFields: [
      { id: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
      { id: "companyName", label: "Company name", type: "text", placeholder: "Company or brand" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { id: "phone", label: "Phone number", type: "tel", required: true, placeholder: "+92 ..." },
      { id: "country", label: "Country", type: "text", required: true, placeholder: "Country" },
      { id: "preferredContactMethod", label: "Preferred contact method", type: "select", required: true, options: ["Email", "Phone", "WhatsApp"] },
      { id: "amazonMarketplace", label: "Amazon marketplace", type: "text", required: true, placeholder: "e.g. Amazon US" },
      { id: "accountIdentifier", label: "Account identifier", type: "text", required: true, placeholder: "Seller ID or another safe identifier", sensitive: true, helpText: "Only provide the identifier needed for review. Never share your password." },
      { id: "accountStatus", label: "Account status", type: "select", required: true, options: ["Deactivated", "At risk", "Listing or selling restriction", "Appeal pending", "Other"] },
      { id: "deactivationReason", label: "Reason for deactivation", type: "text", placeholder: "Use the wording from the notice where possible", sensitive: true },
      { id: "issueDuration", label: "Duration of the issue", type: "text", placeholder: "e.g. 10 days" },
      { id: "issueDescription", label: "Issue description", type: "textarea", required: true, placeholder: "What happened and what have you tried so far?", sensitive: true },
      { id: "notificationScreenshot", label: "Notification screenshot", type: "file", accept: ".png,.jpg,.jpeg,.pdf", multiple: true, sensitive: true, helpText: "Sensitive files must be sent through private object storage when the backend upload endpoint is connected." },
      { id: "previousAppeals", label: "Previous appeals", type: "file", accept: fileTypes, multiple: true, sensitive: true },
      { id: "previousAppealDates", label: "Previous appeal dates", type: "text", placeholder: "Dates, if available" },
      { id: "previousResponses", label: "Previous responses from Amazon", type: "file", accept: fileTypes, multiple: true, sensitive: true },
      { id: "accountDocuments", label: "Relevant account documents", type: "file", accept: fileTypes, multiple: true, sensitive: true },
      { id: "additionalNotes", label: "Additional notes", type: "textarea", placeholder: "Anything else relevant to the review?", sensitive: true },
    ],
    faqs: [
      { question: "Can you guarantee account reinstatement?", answer: "No outcome can be guaranteed. We review your situation and help you prepare a clearer, evidence-based next step." },
      { question: "What information should I provide?", answer: "Start with your account situation, the relevant notice, what happened, and any evidence or previous communication you can safely share." },
      { question: "Do you review previous appeal attempts?", answer: "Yes. Previous appeals and responses can help identify what was already explained, what may be missing, and what should be reviewed next." },
      { question: "How long does a case review take?", answer: "The review depends on the information provided and the complexity of the situation. A timeframe can be discussed after the initial details are received." },
      { question: "What happens after I submit the form?", answer: "We review the basic information, identify any important gaps, and contact you with the next appropriate step." },
    ],
    pricingMode: "quote_only",
    featured: true,
    isActive: true,
    isPublished: true,
    isArchived: false,
    sortOrder: 2,
    disclaimer: "Messi Groups provides support, review, assessment, appeal preparation, and recovery guidance. No reinstatement, recovery, timeline, or outcome is guaranteed.",
    ctaLabel: "Request a Case Review",
    whatsappMessage: "Hello Messi Groups, I would like to request a confidential Amazon account review.",
    seo: { title: "Account Deactivation & Reinstatement Support | Messi Groups", description: "Confidential account review, appeal preparation, and recovery guidance based on your notice and available evidence.", ogImage: "/hero-operations.png", canonicalUrl: "/services/account-deactivation-reinstatement" },
  },
  {
    id: "boost-business-scaling",
    name: "Virtual Assistant Services",
    slug: "boost-business-scaling",
    legacySlugs: ["amazon-virtual-assistant"],
    category: "Virtual Assistant Services",
    shortDescription: "Configurable support for Amazon operations, agencies, consultants, and client delivery.",
    description: "A guided business review for operators who want a clearer path forward. Start with the area creating the most friction, then explore practical support options including Amazon and white-label virtual assistant services, sourcing, operations, and business support.",
    targetCustomer: "Founders, Amazon sellers, agencies, consultants, and growing businesses that need a clearer operating plan.",
    customerProblem: "Growth can stall when priorities are unclear, processes are scattered, or the right support is difficult to scope.",
    primaryOutcome: "A focused review that identifies a practical starting point without promising a specific business result.",
    benefits: ["A clearer view of the bottleneck behind the current challenge.", "A focused next-step plan across sales, systems, sourcing, or e-commerce.", "Optional Amazon and white-label virtual assistant support with configurable scope.", "A short enquiry path that captures enough context for a useful first conversation."],
    process: [
      { number: "01", title: "Define the support model", description: "Tell us whether you need Amazon support, white-label delivery, or both." },
      { number: "02", title: "Map the workload", description: "Share task types, client or account count, working hours, time zone, and tools." },
      { number: "03", title: "Match the package", description: "We compare the brief to the available support model and identify the right scope." },
      { number: "04", title: "Agree onboarding requirements", description: "Training, access, reporting, confidentiality, and communication expectations are confirmed." },
      { number: "05", title: "Start with a clear operating rhythm", description: "The agreed support moves into the appropriate delivery and review workflow." },
    ],
    requirements: ["The type of work you want supported and what should remain in-house.", "Expected hours, time zone, team size, and number of clients or accounts.", "Tools, reporting, communication, confidentiality, and training expectations.", "For white-label work, the customer-facing brand and client relationship requirements."],
    documents: ["Task lists or standard operating procedures, if available", "Brand or client-facing guidelines for white-label work", "Reporting examples or preferred formats", "Access and confidentiality requirements to review during onboarding"],
    packages: [
      { id: "basic", name: "Basic", description: "A focused starting scope for routine support, subject to confirmation.", includedTasks: [], excludedTasks: [], supportItems: [{ name: "Routine Amazon assistance", explanation: "Recurring operational help can be scoped around the tasks you want to delegate." }, { name: "Research and reporting", explanation: "Research or reporting support can follow your preferred format and cadence." }], workingHours: "To be confirmed", teamSize: "To be confirmed", responseExpectations: "To be confirmed", reportingFrequency: "To be confirmed", toolsIncluded: [], onboardingRequirements: [], pricingMode: "quote_only", recommended: false, displayOrder: 1, isActive: true },
      { id: "standard", name: "Standard", description: "A broader operating brief for ongoing support, subject to confirmation.", includedTasks: [], excludedTasks: [], supportItems: [{ name: "Product and catalogue support", explanation: "Catalogue work can be shaped around the products, marketplaces, and access available." }, { name: "Full Account Management", explanation: "A managed account scope is discussed separately so responsibilities and access stay clear." }], workingHours: "To be confirmed", teamSize: "To be confirmed", responseExpectations: "To be confirmed", reportingFrequency: "To be confirmed", toolsIncluded: [], onboardingRequirements: [], pricingMode: "quote_only", recommended: true, displayOrder: 2, isActive: true },
      { id: "premium", name: "Premium", description: "Higher-touch coordination and reporting for a more involved brief, subject to confirmation.", includedTasks: [], excludedTasks: [], supportItems: [{ name: "Seller support tasks", explanation: "Seller-support coordination can be aligned to your internal process and escalation needs." }, { name: "Customer-support coordination", explanation: "Customer-support workflows can be documented around your brand and service expectations." }], workingHours: "To be confirmed", teamSize: "To be confirmed", responseExpectations: "To be confirmed", reportingFrequency: "To be confirmed", toolsIncluded: [], onboardingRequirements: [], pricingMode: "quote_only", recommended: false, displayOrder: 3, isActive: true },
      { id: "full-management", name: "Full Management", description: "For a broader managed-support conversation where scope is defined together.", includedTasks: [], excludedTasks: [], workingHours: "To be confirmed", teamSize: "To be confirmed", responseExpectations: "To be confirmed", reportingFrequency: "To be confirmed", toolsIncluded: [], onboardingRequirements: [], pricingMode: "quote_only", recommended: false, displayOrder: 4, isActive: false },
      { id: "custom", name: "Custom", description: "For agencies, consultants, or teams with a specific delivery model.", includedTasks: [], excludedTasks: [], workingHours: "To be confirmed", teamSize: "To be confirmed", responseExpectations: "To be confirmed", reportingFrequency: "To be confirmed", toolsIncluded: [], onboardingRequirements: [], pricingMode: "quote_only", recommended: false, displayOrder: 5, isActive: false },
    ],
    formFields: [
      { id: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
      { id: "companyName", label: "Agency or company name", type: "text", required: true, placeholder: "Company or agency" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { id: "phone", label: "Phone number", type: "tel", required: true, placeholder: "+92 ..." },
      { id: "country", label: "Country", type: "text", required: true, placeholder: "Country" },
      { id: "preferredContactMethod", label: "Preferred contact method", type: "select", required: true, options: ["Email", "Phone", "WhatsApp"] },
      { id: "serviceType", label: "Service type", type: "select", required: true, options: ["Amazon virtual assistant", "White-label virtual assistant", "Both / not sure"] },
      { id: "customerFacingBrand", label: "Customer-facing brand name", type: "text", placeholder: "Brand used with your clients", condition: { field: "serviceType", equals: "White-label virtual assistant" } },
      { id: "requiredServiceType", label: "Required service type", type: "textarea", required: true, placeholder: "What should the team support?" },
      { id: "numberOfClients", label: "Number of clients or accounts", type: "number", placeholder: "Approximate number" },
      { id: "requiredTeamSize", label: "Required team size", type: "text", placeholder: "e.g. one dedicated VA" },
      { id: "expectedWorkingHours", label: "Expected working hours", type: "text", placeholder: "Hours per week or month" },
      { id: "timeZone", label: "Time zone", type: "text", placeholder: "e.g. EST, GMT, PKT" },
      { id: "communicationRequirements", label: "Communication requirements", type: "textarea", placeholder: "Channels, meeting cadence, escalation path" },
      { id: "reportingRequirements", label: "Reporting requirements", type: "textarea", placeholder: "Report format and frequency" },
      { id: "brandingRequirements", label: "Branding requirements", type: "textarea", placeholder: "Only needed for white-label scope", condition: { field: "serviceType", equals: "White-label virtual assistant" } },
      { id: "confidentialityRequirements", label: "Confidentiality requirements", type: "textarea", placeholder: "NDA, client privacy, restricted access, etc." },
      { id: "toolsUsed", label: "Tools or platforms used", type: "textarea", placeholder: "Amazon Seller Central, project tools, reporting tools, etc." },
      { id: "trainingRequirements", label: "Training requirements", type: "textarea", placeholder: "Existing SOPs, training needed, or certification requirements" },
      { id: "additionalNotes", label: "Additional notes", type: "textarea", placeholder: "Anything else we should know?" },
    ],
    faqs: [
      { question: "What is the difference between Amazon VA and white-label VA support?", answer: "Amazon VA support is scoped around your own Amazon or e-commerce operation. White-label VA support is structured for an agency, consultant, or business that wants delivery to sit under its own brand or client relationship." },
      { question: "Are all listed Amazon tasks included?", answer: "No. Tasks, hours, tools, reporting, and onboarding requirements are configurable and should be confirmed in the final scope or package proposal." },
      { question: "Do you publish package prices?", answer: "Not yet. These packages are quote-only until scope, hours, team size, tools, and reporting requirements are confirmed." },
    ],
    pricingMode: "quote_only",
    featured: true,
    isActive: true,
    isPublished: true,
    isArchived: false,
    sortOrder: 3,
    disclaimer: "Virtual assistant packages, included tasks, hours, staffing, response expectations, and pricing are subject to confirmation after scope and onboarding requirements are reviewed.",
    ctaLabel: "Find My Assistant Fit",
    whatsappMessage: "Hello Messi Groups, I would like to discuss virtual assistant support.",
    seo: { title: "Virtual Assistant Services | Messi Groups", description: "Flexible virtual assistant support for Amazon research, operations, customer service, admin, and daily e-commerce tasks.", ogImage: "/hero-operations.png", canonicalUrl: "/services/boost-business-scaling" },
    comparison: [
      { label: "Best for", amazon: "Your own Amazon or e-commerce operation", whiteLabel: "Agencies, consultants, or businesses serving clients" },
      { label: "Customer-facing brand", amazon: "Messi Groups support for your business", whiteLabel: "Your brand or client relationship" },
      { label: "Typical scope", amazon: "Amazon assistance, catalogue, research, reporting, admin, and coordination", whiteLabel: "A configurable delivery team aligned to your service model" },
      { label: "Key setup detail", amazon: "Account priorities, tasks, hours, and tools", whiteLabel: "Branding, confidentiality, client count, reporting, and training" },
    ],
  },
  {
    id: "llc-creation",
    name: "LLC Creation",
    slug: "llc-creation",
    category: "Business Formation",
    shortDescription: "A guided starting point for building your business foundation in the US.",
    description: "Messi Groups helps you organize the early business-formation information and next steps around an LLC setup. Requirements vary by state and business type.",
    targetCustomer: "Amazon sellers, founders, and businesses preparing to establish a US business structure.",
    customerProblem: "The first formation decisions can feel unclear when state, documents, and filing direction are not organized.",
    primaryOutcome: "A clearer starting plan for the information and documents needed to move toward filing.",
    benefits: ["Business name guidance", "State selection support", "Document preparation", "Filing direction"],
    process: [
      { number: "01", title: "Choose your structure", description: "Share what you are setting up and the business context around it." },
      { number: "02", title: "Prepare your documents", description: "Organize the core information and records needed for the next step." },
      { number: "03", title: "Move toward filing", description: "Review the filing direction and outstanding requirements for your situation." },
    ],
    requirements: ["Business purpose and intended activity", "Preferred state or location context", "Founder or owner information", "Any banking or operations goals"],
    documents: ["Identity and owner information", "Business name options", "Address and contact details", "Supporting business information where relevant"],
    packages: [{ id: "llc-setup", name: "LLC setup guidance", description: "A quote-only starting scope based on your formation requirements.", includedTasks: ["Formation information review", "Document preparation direction", "Filing next-step guidance"], excludedTasks: ["Legal or tax advice", "Guaranteed approval", "State filing fees"], pricingMode: "quote_only", displayOrder: 1, isActive: true }],
    formFields: [
      { id: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { id: "businessType", label: "Business type", type: "text", placeholder: "Amazon, e-commerce, consulting, or other" },
      { id: "additionalNotes", label: "Additional notes", type: "textarea", placeholder: "Tell us what you are setting up." },
    ],
    faqs: [],
    pricingMode: "quote_only",
    featured: false,
    isActive: true,
    isPublished: true,
    isArchived: false,
    sortOrder: 4,
    disclaimer: "Requirements may vary by state and business type. Messi Groups does not provide legal or tax advice through this page.",
    ctaLabel: "Start LLC Setup",
    whatsappMessage: "Hello Messi Groups, I would like to discuss LLC creation support.",
    seo: { title: "LLC Creation Support | Messi Groups", description: "A guided starting point for organizing your US LLC formation information, documents, and filing direction.", ogImage: "/hero-operations.png", canonicalUrl: "/services/llc-creation" },
  },
  {
    id: "us-physical-bank-account",
    name: "US Physical Bank Account",
    slug: "us-physical-bank-account",
    category: "Business Banking",
    shortDescription: "Guided support for preparing business details, documents, and next steps around a US physical banking setup.",
    description: "Messi Groups helps sellers and businesses organize the information needed to understand a potential US physical banking setup. Requirements and approval decisions depend on the bank, business type, and details provided.",
    targetCustomer: "Amazon sellers, e-commerce businesses, and founders preparing for an American physical banking presence.",
    customerProblem: "Banking requirements can feel unclear when business details, identity information, and supporting documents are not organized.",
    primaryOutcome: "A clearer preparation path and a structured next step based on your business situation.",
    benefits: ["Business setup guidance", "Document preparation", "Application organization", "Requirement clarification"],
    process: [
      { number: "01", title: "Share your details", description: "Tell us about your business and account needs." },
      { number: "02", title: "Prepare the information", description: "We help organize the relevant details and documents." },
      { number: "03", title: "Understand the next step", description: "You receive clearer guidance based on your situation." },
    ],
    requirements: ["Business activity and purpose", "Identity and contact information", "A clear description of the banking need", "Supporting documents where available"],
    documents: ["Identity information", "Business formation records", "Business address and contact details", "Supporting business or operational documents"],
    packages: [{ id: "banking-setup-review", name: "Banking setup review", description: "A quote-only preparation review based on your business details and document context.", includedTasks: ["Business information review", "Document preparation direction", "Next-step guidance"], excludedTasks: ["Guaranteed approval", "Guaranteed account opening", "Banking or tax advice"], pricingMode: "quote_only", displayOrder: 1, isActive: true }],
    formFields: [
      { id: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
      { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
      { id: "businessType", label: "Business type", type: "text", required: true, placeholder: "Amazon, e-commerce, consulting, or other" },
      { id: "bankingNeed", label: "What do you need help with?", type: "textarea", required: true, placeholder: "Tell us what you are preparing for." },
      { id: "optionalDocument", label: "Optional document upload", type: "file", accept: ".png,.jpg,.jpeg,.pdf,.doc,.docx,.xlsx,.xls,.csv", multiple: true, sensitive: true, helpText: "Private upload connection required before production." },
    ],
    faqs: [
      { question: "What information may be required?", answer: "The bank may request business, identity, contact, purpose, and supporting documents. Requirements vary by bank and business type." },
      { question: "Can account approval be guaranteed?", answer: "No. Final approval and account-opening decisions depend on the bank's requirements and review." },
      { question: "What happens after I submit my details?", answer: "We review the basics, identify any important gaps, and contact you with the most practical next step." },
    ],
    pricingMode: "quote_only",
    featured: false,
    isActive: true,
    isPublished: true,
    isArchived: false,
    sortOrder: 5,
    disclaimer: "Requirements and approval decisions vary by bank and business type. Messi Groups does not guarantee account approval or account opening.",
    ctaLabel: "Check My Setup",
    whatsappMessage: "Hello Messi Groups, I would like to discuss US physical bank account setup support.",
    seo: { title: "US Physical Bank Account Support | Messi Groups", description: "Prepare your business details and documents for a US physical banking setup with guided, enquiry-first support.", ogImage: "/hero-operations.png", canonicalUrl: "/services/us-physical-bank-account" },
  },
  {
    id: "sourcing",
    name: "Sourcing",
    slug: "sourcing",
    category: "Sourcing",
    shortDescription: "Practical sourcing pathways for businesses building a more resilient supply plan.",
    description: "Messi Groups helps businesses organize product requirements, supplier options, quote comparisons, and logistics considerations into a clearer sourcing request.",
    targetCustomer: "E-commerce sellers, brands, and businesses exploring a clearer product sourcing pathway.",
    customerProblem: "Sourcing decisions become harder when product details, supplier options, quality expectations, and destination requirements are scattered.",
    primaryOutcome: "A structured sourcing brief and a clearer next step based on the information available.",
    benefits: ["Product requirements", "Supplier research", "Quote comparison", "Logistics planning"],
    process: [
      { number: "01", title: "Share your product brief", description: "Tell us what you need and where it needs to go." },
      { number: "02", title: "Review sourcing options", description: "We organize suitable sourcing pathways." },
      { number: "03", title: "Compare requirements", description: "Review quantity, quality, lead time, and logistics considerations." },
      { number: "04", title: "Confirm the next step", description: "Move forward with a clearer sourcing plan." },
    ],
    requirements: ["Product type and specifications", "Approximate quantity", "Destination and quality expectations", "Preferred or required transport mode"],
    documents: ["Product images or specifications", "Reference quotations", "Dimensions and weight information", "Destination or logistics details"],
    packages: [{ id: "sourcing-review", name: "Sourcing request review", description: "A quote-only review of your requirements and the most practical next step.", includedTasks: ["Product brief review", "Sourcing pathway discussion", "Requirement and logistics review"], excludedTasks: ["Guaranteed supplier availability", "Guaranteed pricing", "Guaranteed delivery timeline"], pricingMode: "quote_only", displayOrder: 1, isActive: true }],
    formFields: [
      { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
      { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
      { id: "product", label: "Product", type: "text", required: true, placeholder: "What are you sourcing?" },
      { id: "quantity", label: "Quantity", type: "text", required: true, placeholder: "Approximate units" },
      { id: "destination", label: "Destination", type: "text", required: true, placeholder: "Where should it go?" },
      { id: "qualityRequirements", label: "Quality requirements", type: "textarea", required: true, placeholder: "Share the quality or specification details that matter." },
      { id: "optionalDocument", label: "Optional file upload", type: "file", accept: fileTypes, multiple: true, helpText: "Product images, specifications, quotations, or reference files." },
    ],
    faqs: [
      { question: "What should I include in a sourcing request?", answer: "Start with the product, approximate quantity, destination, quality expectations, and any reference files you already have." },
      { question: "Can you guarantee a supplier, price, or delivery time?", answer: "No. Supplier availability, pricing, lead times, and logistics depend on the brief and review at the time of enquiry." },
      { question: "What happens after I submit the request?", answer: "We review the requirements, identify important gaps, and contact you about the most practical next step." },
    ],
    pricingMode: "quote_only",
    featured: false,
    isActive: true,
    isPublished: true,
    isArchived: false,
    sortOrder: 6,
    disclaimer: "Sourcing pathways, supplier availability, pricing, lead times, and logistics outcomes require review and are not guaranteed.",
    ctaLabel: "Start a Sourcing Request",
    whatsappMessage: "Hello Messi Groups, I would like to start a sourcing request.",
    seo: { title: "Sourcing Support | Messi Groups", description: "Practical sourcing support around product requirements, supplier options, quote comparison, and logistics planning.", ogImage: "/hero-operations.png", canonicalUrl: "/services/sourcing" },
  },
  {
    id: "amazon-course-mastery",
    name: "Amazon Course Mastery",
    slug: "amazon-course-mastery",
    category: "Amazon Training",
    shortDescription: "Practical training for safer accounts and stronger operating habits.",
    description: "Amazon Course Mastery is practical training around product research, listings, PPC, account operations, and client-focused Amazon work. Course format, schedule, fees, and any additional opportunities are confirmed through enquiry.",
    targetCustomer: "Beginners, sellers, assistants, and operators who want a clearer practical foundation for Amazon work.",
    customerProblem: "Amazon work becomes harder to manage when research, listings, advertising, account operations, and client delivery are learned as disconnected tasks.",
    primaryOutcome: "A structured learning path and clearer next step for building Amazon operating skills.",
    benefits: ["Product research", "Listings and launch", "PPC and growth", "Account and client operations"],
    process: [
      { number: "01", title: "Choose your format", description: "Tell us whether online, onsite, or live sessions fit your situation." },
      { number: "02", title: "Review the learning path", description: "Explore the tracks, modules, and support included in the course." },
      { number: "03", title: "Confirm course details", description: "We share the available schedule, fees, and enrolment information." },
    ],
    requirements: ["Your preferred course format", "Current Amazon experience", "Topics you want to strengthen", "A reliable WhatsApp number or email"],
    documents: ["Any current learning goals or notes", "Existing Amazon work samples where useful", "Questions you want the instructor to address"],
    packages: [{ id: "course-details", name: "Course details", description: "Request the current course format, schedule, fees, and enrolment information.", includedTasks: ["Course format overview", "Module outline", "Enrolment information"], excludedTasks: ["Unverified income claims", "Guaranteed results", "Guaranteed internship placement"], pricingMode: "quote_only", displayOrder: 1, isActive: true }],
    formFields: [
      { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
      { id: "whatsapp", label: "WhatsApp number", type: "tel", required: true, placeholder: "+92 ..." },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { id: "preferredFormat", label: "Preferred format", type: "select", required: true, options: ["Online training", "Onsite classes", "Live Zoom sessions", "Not sure yet"] },
      { id: "experience", label: "Current Amazon experience", type: "select", required: true, options: ["Beginner", "Some experience", "Currently operating", "Supporting clients", "Not sure yet"] },
      { id: "message", label: "Message", type: "textarea", required: true, placeholder: "What would you like to learn?" },
    ],
    faqs: [
      { question: "Is the course online or onsite?", answer: "The available format can vary. Request the current details for online, onsite, or live Zoom options." },
      { question: "Is this suitable for beginners?", answer: "The learning path includes foundations, so beginners can ask about the current starting point and support format." },
      { question: "Are recorded lessons included?", answer: "Recorded lesson access is included when confirmed for the current course offering." },
      { question: "How do I get the schedule and fees?", answer: "Share your details through the enquiry form and the team can provide the current schedule, fees, and enrolment information." },
    ],
    pricingMode: "quote_only",
    featured: false,
    isActive: true,
    isPublished: true,
    isArchived: false,
    sortOrder: 4,
    disclaimer: "Course format, schedule, fees, mentor support, and any internship opportunity are subject to current confirmation. No learning or income outcome is guaranteed.",
    ctaLabel: "Request Course Details",
    whatsappMessage: "Hello Messi Groups, I would like to request Amazon Course Mastery details.",
    seo: { title: "Amazon Course Mastery | Messi Groups", description: "Practical Amazon training across product research, listings, PPC, account operations, and client-focused work.", ogImage: "/hero-operations.png", canonicalUrl: "/services/amazon-course-mastery" },
  },
  {
    id: "3pl-warehouse-services",
    name: "3PL Warehouse Services",
    slug: "3pl-warehouse-services",
    legacySlugs: ["3pl-service"],
    category: "3PL Warehouse Services",
    shortDescription: "Warehouse and inventory movement support when a suitable facility is required.",
    description: "Messi Groups helps businesses organize storage, receiving, inventory movement, and dispatch requirements before discussing a suitable facility pathway.",
    targetCustomer: "Sellers, brands, and businesses that need a clearer warehouse or inventory movement plan.",
    customerProblem: "Inventory movement becomes difficult when storage duration, receiving patterns, handling needs, and dispatch requirements are not organized together.",
    primaryOutcome: "A structured facility-fit review and a clearer next step based on your inventory requirements.",
    benefits: ["Storage requirements", "Inventory receiving", "Inventory movement", "Dispatch planning"],
    process: [
      { number: "01", title: "Share your inventory details", description: "Tell us what is moving and where it needs to go." },
      { number: "02", title: "Review facility requirements", description: "We organize the requirements that shape facility fit." },
      { number: "03", title: "Plan storage and movement", description: "Clarify the expected receiving, storage, and dispatch flow." },
      { number: "04", title: "Confirm the next step", description: "Move forward with a clearer facility review." },
    ],
    requirements: ["Inventory type and approximate quantity", "Expected storage duration", "Inbound and outbound frequency", "Location and handling requirements"],
    documents: ["Inventory lists or spreadsheets", "Product and handling information", "Dimensions and weight details", "Dispatch or destination information"],
    packages: [{ id: "facility-fit-review", name: "Facility-fit review", description: "A quote-only review of your warehouse and inventory movement requirements.", includedTasks: ["Requirement review", "Storage and movement discussion", "Facility-fit next-step guidance"], excludedTasks: ["Guaranteed facility availability", "Guaranteed pricing", "Guaranteed storage or delivery outcome"], pricingMode: "quote_only", displayOrder: 1, isActive: true }],
    formFields: [
      { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
      { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
      { id: "inventoryType", label: "Inventory type", type: "select", required: true, options: ["General merchandise", "Apparel", "Fragile goods", "Other"] },
      { id: "quantity", label: "Quantity", type: "text", required: true, placeholder: "Approximate units" },
      { id: "storageDuration", label: "Storage duration", type: "select", required: true, options: ["Short term", "1–3 months", "Longer term", "Not sure yet"] },
      { id: "location", label: "Location", type: "text", required: true, placeholder: "Where is the inventory now or going?" },
      { id: "handlingRequirements", label: "Handling requirements", type: "textarea", required: true, placeholder: "Packing, labeling, fragile handling, or other needs" },
      { id: "optionalDocument", label: "Optional file upload", type: "file", accept: fileTypes, multiple: true, helpText: "Inventory lists, product details, or handling references." },
    ],
    faqs: [
      { question: "What information should I prepare for a facility review?", answer: "Start with your inventory type, approximate quantity, storage duration, location, movement frequency, and any special handling needs." },
      { question: "Can you guarantee facility availability or pricing?", answer: "No. Suitable facilities, availability, pricing, and operational terms require a review and are not guaranteed from the public page." },
      { question: "What happens after I submit the request?", answer: "We review the requirements, identify important gaps, and contact you about the most practical next step." },
    ],
    pricingMode: "quote_only",
    featured: false,
    isActive: true,
    isPublished: true,
    isArchived: false,
    sortOrder: 7,
    disclaimer: "Facility fit, availability, pricing, storage, and movement outcomes require review and are not guaranteed.",
    ctaLabel: "Check Warehouse Fit",
    whatsappMessage: "Hello Messi Groups, I would like to discuss 3PL warehouse and inventory movement support.",
    seo: { title: "3PL Warehouse Services | Messi Groups", description: "Warehouse and inventory movement support for storage, receiving, dispatch, and facility-fit planning.", ogImage: "/hero-operations.png", canonicalUrl: "/services/3pl-warehouse-services" },
  },
];

export const serviceCategories: ServiceCategory[] = [
  { id: "inventory-liquidation", number: "01", label: "Account Liquidation", description: "Review, organize, value, and route inventory with a clearer commercial plan.", icon: "PackageCheck", detailServiceSlugs: ["account-liquidation"] },
  { id: "account-recovery", number: "02", label: "Account Deactivation & Reinstatement Support", description: "Structured support for account health issues, appeals, and recovery guidance.", icon: "ShieldCheck", detailServiceSlugs: ["account-deactivation-reinstatement"] },
  { id: "virtual-assistant", number: "03", label: "Virtual Assistant (Amazon & White Label)", description: "Configurable support for Amazon operations, agencies, consultants, and client delivery.", icon: "TrendingUp", detailServiceSlugs: ["boost-business-scaling"] },
  { id: "course", number: "04", label: "Amazon Course Mastery", description: "Practical training for safer accounts and stronger operating habits.", icon: "GraduationCap", detailServiceSlugs: ["amazon-course-mastery"] },
  { id: "llc-creation", number: "05", label: "LLC Creation", description: "A clearer starting point for setting up the right business foundation.", icon: "Building2", detailServiceSlugs: ["llc-creation"] },
  { id: "us-physical-bank-account", number: "06", label: "US Physical Bank Account", description: "Guided support for establishing an American physical banking presence.", icon: "Landmark", detailServiceSlugs: ["us-physical-bank-account"] },
  { id: "sourcing", number: "07", label: "Sourcing", description: "Practical sourcing pathways for businesses building a more resilient supply plan.", icon: "PackageCheck", detailServiceSlugs: ["sourcing"] },
  { id: "3pl-service", number: "08", label: "3PL Service (Warehouse Required for Inventory)", description: "Warehouse and inventory movement support where a suitable facility is required.", icon: "Building2", detailServiceSlugs: ["3pl-warehouse-services"] },
    { id: "shipment-from-pak", number: "09", label: "Shipment from Pakistan (Within 7 Days)", description: "Shipment coordination from Pakistan, subject to inventory, route, and logistics review.", icon: "ReceiptText", detailServiceSlugs: [] },
];

const toHomepageService = (category: ServiceCategory): HomepageService => ({
  number: category.number,
  title: category.label,
  description: category.description,
  icon: category.icon,
  href: category.detailServiceSlugs[0] ? `/services/${category.detailServiceSlugs[0]}` : `/services#${category.id}`,
  featured: category.detailServiceSlugs.length > 0,
});

// The homepage stays focused on the eight highest-intent entry points. The full
// nine-service catalogue remains available on /services.
export const homepageServices: HomepageService[] = [
  toHomepageService(serviceCategories[0]),
  toHomepageService(serviceCategories[1]),
  { number: "03", title: "Virtual Assistant Services", description: "Configurable operational support for Amazon work, research, admin, and client delivery.", icon: "TrendingUp", href: "/services/boost-business-scaling", featured: true },
  { ...toHomepageService(serviceCategories[4]), number: "04" },
  { ...toHomepageService(serviceCategories[5]), number: "05" },
  { ...toHomepageService(serviceCategories[6]), number: "06" },
  { number: "07", title: "3PL Warehouse Services", description: "Warehouse and inventory movement support when a suitable facility is required.", icon: "Building2", href: "/services/3pl-warehouse-services", featured: true },
  { number: "08", title: "Amazon Course Mastery", description: "Practical training for safer accounts and stronger operating habits.", icon: "GraduationCap", href: "/services/amazon-course-mastery", featured: true },
];

export const catalogueServices: HomepageService[] = serviceCategories.map(toHomepageService);

export function getServiceBySlug(slug: string) {
  return priorityServices.find((service) => service.slug === slug || service.legacySlugs?.includes(slug));
}

export const publishedServices = priorityServices.filter((service) => service.isActive && service.isPublished && !service.isArchived);

export const PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://messigroups.com";
