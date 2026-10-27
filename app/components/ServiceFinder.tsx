"use client";

import Link from "next/link";
import { useState } from "react";
import { homepageServices } from "../lib/services";

const problems = [
  ["My Amazon account is suspended", "Account Deactivation & Reinstatement Support"],
  ["I need to liquidate inventory", "Account Liquidation"],
  ["I need business or banking setup", "LLC Creation"],
  ["I need help with sourcing or logistics", "Sourcing"],
  ["I need a virtual assistant", "Virtual Assistant Services"],
  ["I am not sure", ""],
] as const;

const urgencyOptions = ["Urgent", "Within this month", "I am planning ahead"] as const;

type ServiceFinderProps = { triggerLabel?: string; className?: string };

export default function ServiceFinder({ triggerLabel = "Find my solution", className = "button button-secondary" }: ServiceFinderProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState("");
  const [urgency, setUrgency] = useState("");

  const selectedService = homepageServices.find((service) => service.title === problem);
  const close = () => {
    setOpen(false);
    setStep(0);
    setProblem("");
    setUrgency("");
  };

  return (
    <>
      <button className={className} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog">{triggerLabel}</button>
      {open ? (
        <div className="service-finder-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <section className="service-finder-dialog" role="dialog" aria-modal="true" aria-labelledby="service-finder-title">
            <button className="dialog-close" type="button" onClick={close} aria-label="Close service finder">Close</button>
            {step < 2 ? (
              <>
                <p className="service-finder-progress">Step {step + 1} of 2</p>
                <h2 id="service-finder-title">{step === 0 ? "What problem are you facing?" : "How urgently do you need help?"}</h2>
                <div className="service-finder-options">
                  {(step === 0 ? problems : urgencyOptions.map((option) => [option, option] as const)).map(([label, value]) => (
                    <button className={`service-finder-option ${(step === 0 ? problem : urgency) === value ? "is-selected" : ""}`} type="button" key={label} onClick={() => { if (step === 0) setProblem(value); else setUrgency(value); setStep(step + 1); }}>{label}</button>
                  ))}
                </div>
              </>
            ) : (
              <div className="service-finder-result">
                <p className="service-finder-progress">Your starting point</p>
                <h2 id="service-finder-title">{selectedService?.title || "A free seller assessment"}</h2>
                <p>Based on your answers, a Messi Groups specialist can help you frame the most practical next step. This is a guided starting point, not an automated diagnosis.</p>
                <div className="service-finder-actions">
                  <Link className="button button-primary" href={selectedService?.href || "/#contact-form"} onClick={close}>Speak to a Messi Groups specialist</Link>
                  <button className="text-link" type="button" onClick={() => { setStep(0); setProblem(""); setUrgency(""); }}>Start again</button>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
