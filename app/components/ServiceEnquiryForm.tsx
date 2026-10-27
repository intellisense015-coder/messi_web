"use client";

import { CheckCircle2, LockKeyhole, UploadCloud, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { Service, ServiceField } from "../lib/services";

type FormValues = Record<string, string>;
type FileMap = Record<string, File[]>;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const compactLiquidationFields: ServiceField[] = [
  { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
  { id: "inventorySituation", label: "Inventory situation", type: "select", required: true, options: ["Account deactivated", "Inventory is stranded", "Planning an exit", "Not sure yet"] },
  { id: "shortMessage", label: "Short message", type: "textarea", required: true, placeholder: "Tell us what you are dealing with." },
];

const compactRecoveryFields: ServiceField[] = [
  { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
  { id: "accountSituation", label: "Account situation", type: "select", required: true, options: ["Account deactivated", "Account suspended", "Policy warning received", "Appeal rejected"] },
  { id: "whatHappened", label: "What happened?", type: "textarea", required: true, placeholder: "Briefly describe the issue." },
  { id: "optionalDocument", label: "Optional document upload", type: "file", accept: ".png,.jpg,.jpeg,.pdf", multiple: true, helpText: "PDF, JPG, or PNG · Max 10MB per file" },
];

const compactVirtualAssistantFields: ServiceField[] = [
  { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
  { id: "whatToDelegate", label: "What would you like to delegate?", type: "textarea", required: true, placeholder: "Research, operations, customer support, or growth work." },
  { id: "shortMessage", label: "Short message", type: "textarea", required: true, placeholder: "Tell us what support would make the biggest difference." },
];

const compactLlcFields: ServiceField[] = [
  { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
  { id: "businessType", label: "What are you setting up?", type: "select", required: true, options: ["Amazon business", "US-based company", "Business banking and operations", "Not sure yet"] },
  { id: "shortMessage", label: "Short message", type: "textarea", placeholder: "Tell us what you are setting up.", required: true },
];

const compactBankingFields: ServiceField[] = [
  { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
  { id: "businessType", label: "Business type", type: "text", required: true, placeholder: "Amazon, e-commerce, consulting, or other" },
  { id: "bankingNeed", label: "What do you need help with?", type: "textarea", required: true, placeholder: "Tell us what you are preparing for." },
  { id: "optionalDocument", label: "Optional document upload", type: "file", accept: ".png,.jpg,.jpeg,.pdf,.doc,.docx,.xlsx,.xls,.csv", multiple: true, sensitive: true, helpText: "Private upload connection required before production." },
];

const compactSourcingFields: ServiceField[] = [
  { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
  { id: "product", label: "Product", type: "text", required: true, placeholder: "What are you sourcing?" },
  { id: "quantity", label: "Quantity", type: "text", required: true, placeholder: "Approximate units" },
  { id: "destination", label: "Destination", type: "text", required: true, placeholder: "Where should it go?" },
  { id: "qualityRequirements", label: "Quality requirements", type: "textarea", required: true, placeholder: "Share the quality or specification details that matter." },
  { id: "optionalDocument", label: "Optional file upload", type: "file", accept: ".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv,.doc,.docx", multiple: true, helpText: "Product images, specifications, quotations, or reference files." },
];

const compactThreePlFields: ServiceField[] = [
  { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "emailOrWhatsapp", label: "Email or WhatsApp", type: "text", required: true, placeholder: "you@company.com or +92 ..." },
  { id: "inventoryType", label: "Inventory type", type: "select", required: true, options: ["General merchandise", "Apparel", "Fragile goods", "Other"] },
  { id: "quantity", label: "Quantity", type: "text", required: true, placeholder: "Approximate units" },
  { id: "storageDuration", label: "Storage duration", type: "select", required: true, options: ["Short term", "1–3 months", "Longer term", "Not sure yet"] },
  { id: "location", label: "Location", type: "text", required: true, placeholder: "Where is the inventory now or going?" },
  { id: "handlingRequirements", label: "Handling requirements", type: "textarea", required: true, placeholder: "Packing, labeling, fragile handling, or other needs" },
  { id: "optionalDocument", label: "Optional file upload", type: "file", accept: ".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv,.doc,.docx", multiple: true, helpText: "Inventory lists, product details, or handling references." },
];

const compactCourseFields: ServiceField[] = [
  { id: "fullName", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "whatsapp", label: "WhatsApp number", type: "tel", required: true, placeholder: "+92 ..." },
  { id: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
  { id: "preferredFormat", label: "Preferred format", type: "select", required: true, options: ["Online training", "Onsite classes", "Live Zoom sessions", "Not sure yet"] },
  { id: "experience", label: "Current Amazon experience", type: "select", required: true, options: ["Beginner", "Some experience", "Currently operating", "Supporting clients", "Not sure yet"] },
  { id: "message", label: "Message", type: "textarea", required: true, placeholder: "What would you like to learn?" },
];

function isVisible(field: ServiceField, values: FormValues) {
  if (!field.condition) return true;
  const current = values[field.condition.field] || "";
  if (field.condition.equals) return current === field.condition.equals;
  if (field.condition.includes) return current.includes(field.condition.includes);
  return true;
}

function criticalFieldIds(service: Service) {
  if (service.slug === "account-deactivation-reinstatement") return ["fullName", "emailOrWhatsapp", "accountSituation", "whatHappened", "optionalDocument"];
  if (service.slug === "account-liquidation") return ["fullName", "emailOrWhatsapp", "inventorySituation", "shortMessage"];
  if (service.slug === "boost-business-scaling") return ["fullName", "emailOrWhatsapp", "whatToDelegate", "shortMessage"];
  if (service.slug === "llc-creation") return ["fullName", "emailOrWhatsapp", "businessType", "shortMessage"];
  if (service.slug === "us-physical-bank-account") return ["fullName", "emailOrWhatsapp", "businessType", "bankingNeed", "optionalDocument"];
  if (service.slug === "sourcing") return ["fullName", "emailOrWhatsapp", "product", "quantity", "destination", "qualityRequirements", "optionalDocument"];
  if (service.slug === "3pl-warehouse-services") return ["fullName", "emailOrWhatsapp", "inventoryType", "quantity", "storageDuration", "location", "handlingRequirements", "optionalDocument"];
  if (service.slug === "amazon-course-mastery") return ["fullName", "whatsapp", "email", "preferredFormat", "experience", "message"];
  return ["fullName", "companyName", "email", "phone", "country", "serviceType", "requiredServiceType"];
}

export default function ServiceEnquiryForm({ service }: { service: Service }) {
  const [values, setValues] = useState<FormValues>({});
  const [files, setFiles] = useState<FileMap>({});
  const [submissionState, setSubmissionState] = useState<"idle" | "unavailable">("idle");
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const isLiquidation = service.slug === "account-liquidation";
  const isRecovery = service.slug === "account-deactivation-reinstatement";
  const isVirtualAssistant = service.slug === "boost-business-scaling";
  const isLlc = service.slug === "llc-creation";
  const isBanking = service.slug === "us-physical-bank-account";
  const isSourcing = service.slug === "sourcing";
  const isThreePl = service.slug === "3pl-warehouse-services";
  const isCourse = service.slug === "amazon-course-mastery";
  const formFields = isLiquidation ? compactLiquidationFields : isRecovery ? compactRecoveryFields : isVirtualAssistant ? compactVirtualAssistantFields : isLlc ? compactLlcFields : isBanking ? compactBankingFields : isSourcing ? compactSourcingFields : isThreePl ? compactThreePlFields : isCourse ? compactCourseFields : service.formFields;
  const visibleFields = useMemo(() => formFields.filter((field) => isVisible(field, values)), [formFields, values]);
  const criticalIds = criticalFieldIds(service);
  const criticalFields = visibleFields.filter((field) => criticalIds.includes(field.id));
  const optionalFields = visibleFields.filter((field) => !criticalIds.includes(field.id));

  function updateValue(id: string, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
    setSubmissionState("idle");
    setError("");
  }

  function updateFiles(id: string, nextFiles: FileList | null) {
    if (!nextFiles) return;
    const selected = Array.from(nextFiles);
    const oversized = selected.find((file) => file.size > MAX_FILE_SIZE);
    if (oversized) {
      setFileError(`${oversized.name} is larger than the 10MB limit.`);
      return;
    }
    setFileError("");
    setFiles((current) => ({ ...current, [id]: [...(current[id] || []), ...selected] }));
  }

  function removeFile(fieldId: string, fileIndex: number) {
    setFiles((current) => ({ ...current, [fieldId]: (current[fieldId] || []).filter((_, index) => index !== fileIndex) }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requiredMissing = criticalFields.filter((field) => field.required && field.type !== "file" && !values[field.id]?.trim());
    if (requiredMissing.length) {
      setError(`Please complete: ${requiredMissing.map((field) => field.label).join(", ")}.`);
      return;
    }
    setError("");
    setSubmissionState("unavailable");
  }

  if (submissionState === "unavailable") return <div className={`enquiry-success enquiry-not-configured ${isRecovery ? "is-recovery-success" : ""}`} role="status"><CheckCircle2 size={32} /><h3>{isRecovery ? "Thank you. We have received your case details and will review them before contacting you with the next step." : isSourcing ? "Your sourcing request passed the local checks." : isThreePl ? "Your facility review request passed the local checks." : isCourse ? "Your course details request passed the local checks." : "Your details passed the local checks."}</h3><p>This local preview does not have a production submission endpoint configured, so nothing has been uploaded or saved. Connect the secure lead workflow before launch.</p><button className="button button-secondary" type="button" onClick={() => setSubmissionState("idle")}>Edit my enquiry</button>{!isRecovery && !isVirtualAssistant && !isLlc && !isBanking && !isSourcing && !isThreePl && !isCourse && <a className="button button-primary" href="https://wa.me/923244946911" target="_blank" rel="noreferrer">Continue on WhatsApp</a>}</div>;

  return <form className={`service-enquiry-form ${isLiquidation ? "is-compact-liquidation-form" : ""} ${isRecovery ? "is-compact-recovery-form" : ""} ${isVirtualAssistant ? "is-compact-virtual-assistant-form" : ""} ${isLlc ? "is-compact-llc-form" : ""} ${isBanking ? "is-compact-banking-form" : ""} ${isSourcing ? "is-compact-sourcing-form" : ""} ${isThreePl ? "is-compact-three-pl-form" : ""} ${isCourse ? "is-compact-course-form" : ""}`} onSubmit={handleSubmit} noValidate><div className="form-intro"><div><h2 id="enquiry-title">{isLiquidation ? "Liquidation assessment" : isRecovery ? "Start Your Case Review" : isVirtualAssistant ? "Ready to delegate the right work?" : isLlc ? "Start LLC Setup" : isBanking ? "Start Your Banking Setup." : isSourcing ? "Start Your Sourcing Request." : isThreePl ? "Request a Facility Review" : isCourse ? "Request Course Details" : "Start with the essentials."}</h2>{!isLiquidation && !isRecovery && !isVirtualAssistant && !isLlc && !isBanking && !isSourcing && !isThreePl && !isCourse && <p>Complete the short form first. Add more context only if it helps the review.</p>}</div>{!isLiquidation && !isRecovery && !isVirtualAssistant && !isLlc && !isBanking && !isSourcing && !isThreePl && !isCourse && <p className="form-privacy"><LockKeyhole size={16} /> Sensitive uploads are not stored by this demo form. Connect private storage and server-side validation before production use.</p>}</div><div className="form-grid">{criticalFields.map((field) => <Field key={field.id} field={field} value={values[field.id] || ""} files={files[field.id] || []} onChange={updateValue} onFilesChange={updateFiles} onRemoveFile={removeFile} />)}</div>{optionalFields.length > 0 && <details className="form-optional-details"><summary>Share more details <span>Optional</span></summary><div className="form-grid form-grid-optional">{optionalFields.map((field) => <Field key={field.id} field={field} value={values[field.id] || ""} files={files[field.id] || []} onChange={updateValue} onFilesChange={updateFiles} onRemoveFile={removeFile} />)}</div></details>}{fileError && <p className="form-error" role="alert">{fileError}</p>}{error && <p className="form-error" role="alert">{error}</p>}<div className="form-submit-row"><button className="button button-primary" type="submit">{isLiquidation ? "Get My Inventory Assessment" : isRecovery ? "Request My Case Review" : isVirtualAssistant ? "Find My Assistant Fit" : isLlc ? "Start LLC Setup" : isBanking ? "Start My Setup" : isSourcing ? "Submit Sourcing Request" : isThreePl ? "Request a Facility Review" : isCourse ? "Request Course Details" : "Submit enquiry"}</button>{isRecovery ? <span className="recovery-form-reassurance">Private information handling · No guaranteed outcome · Clear next steps</span> : isVirtualAssistant ? <span className="recovery-form-reassurance">No obligation. We will respond with the next practical step.</span> : isLlc ? <span className="recovery-form-reassurance">Requirements may vary by state and business type.</span> : isBanking ? <span className="recovery-form-reassurance">Your information is handled securely. Requirements vary by bank and business type.</span> : isSourcing ? <span className="recovery-form-reassurance">We review your requirements before recommending the next step.</span> : isThreePl ? <span className="recovery-form-reassurance">We review your requirements before confirming suitable options.</span> : isCourse ? <span className="recovery-form-reassurance">Course details, schedule, and fees are confirmed through enquiry.</span> : !isLiquidation && <span>We will use the information you provide to understand the next step.</span>}</div></form>;
}

function Field({ field, value, files, onChange, onFilesChange, onRemoveFile }: { field: ServiceField; value: string; files: File[]; onChange: (id: string, value: string) => void; onFilesChange: (id: string, files: FileList | null) => void; onRemoveFile: (id: string, index: number) => void }) {
  const [dragging, setDragging] = useState(false);
  const common = { id: field.id, name: field.id, required: field.required, placeholder: field.placeholder, value, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(field.id, event.target.value) };
  if (field.id === "preferredLiquidationRoute" && field.options?.length) return <fieldset className="form-field form-option-field"><legend>{field.label}{field.required && <em>Required</em>}</legend><div className="form-option-cards" role="radiogroup" aria-label={field.label}>{field.options.map((option) => <button type="button" role="radio" aria-checked={value === option} className={value === option ? "is-selected" : ""} key={option} onClick={() => onChange(field.id, option)}>{option}</button>)}</div></fieldset>;
  return <label className={`form-field form-field-${field.type}`} htmlFor={field.id}><span>{field.label}{field.required && <em>Required</em>}</span>{field.type === "textarea" ? <textarea {...common} rows={4} /> : field.type === "select" ? <select {...common}><option value="">Select an option</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.type === "file" ? <div className={`file-input-wrap ${dragging ? "is-dragging" : ""}`} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={(event) => { event.preventDefault(); setDragging(false); }} onDrop={(event) => { event.preventDefault(); setDragging(false); onFilesChange(field.id, event.dataTransfer.files); }}><UploadCloud size={25} /><strong>Drop files here or choose files</strong><input id={field.id} name={field.id} type="file" accept={field.accept} multiple={field.multiple} onChange={(event) => onFilesChange(field.id, event.target.files)} /><small>{field.helpText || "Accepted: PDF, JPG, PNG, XLSX, DOCX · Max 10MB per file"}</small>{files.length > 0 && <div className="selected-file-list">{files.map((file, index) => <div key={`${file.name}-${index}`}><span>{file.name}</span><progress value={100} max={100} aria-label={`${file.name} ready`} /><button type="button" aria-label={`Remove ${file.name}`} onClick={() => onRemoveFile(field.id, index)}><X size={14} /></button></div>)}</div>}</div> : <input {...common} type={field.type} min={field.type === "number" ? 0 : undefined} />}{field.helpText && field.type !== "file" && <small>{field.helpText}</small>}</label>;
}
