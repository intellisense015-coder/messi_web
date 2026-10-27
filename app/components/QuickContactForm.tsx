"use client";

import { FormEvent, useState } from "react";
import { homepageServices } from "../lib/services";

export default function QuickContactForm() {
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("ready");
  };

  return (
    <form className="quick-contact-form" id="contact-form" onSubmit={handleSubmit}>
      <div className="quick-form-heading">
        <h3>Tell us what you need</h3>
        <p>A short note is enough to begin the conversation.</p>
      </div>
      <label>Name<input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
      <label>WhatsApp or email<input name="contact" type="text" autoComplete="email" required placeholder="+92 ... or you@company.com" /></label>
      <label>What do you need help with?<select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{homepageServices.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}<option value="Not sure yet">Not sure yet</option></select></label>
      <label>Short description<textarea name="challenge" rows={3} required placeholder="What is blocking your business?" /></label>
      <button className="button button-primary" type="submit">Get My Free Seller Assessment</button>
      {status === "ready" ? <div className="form-status" role="status"><p>This local preview has no connected submission endpoint, so no message has been sent or saved.</p><ol><li>We review your request.</li><li>A specialist contacts you.</li><li>We recommend the most suitable next step.</li></ol></div> : <p className="form-privacy">No obligation. Your information is kept private. We usually respond within one business day.</p>}
    </form>
  );
}
