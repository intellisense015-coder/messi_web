import Image from "next/image";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import CaseStudiesSection from "./components/CaseStudiesSection";
import HeroVideo from "./components/HeroVideo";
import QuickContactForm from "./components/QuickContactForm";
import Reveal from "./components/Reveal";
import ServiceFinder from "./components/ServiceFinder";
import ServiceGrid from "./components/ServiceGrid";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { homepageServices } from "./lib/services";

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <section className="hero-section" aria-labelledby="hero-title">
        <HeroVideo />
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">Amazon Seller Support for Recovery, Growth, and Operations.</h1>
            <p className="hero-tagline">From account recovery and liquidation to virtual assistants, sourcing, and business setup, Messi Groups helps Amazon sellers solve problems and move forward with confidence.</p>
            <div className="hero-actions"><Link className="button button-primary" href="#contact-form">Get My Free Seller Assessment</Link><Link className="button button-secondary" href="#services">Explore Services</Link></div>
          </div>
        </div>
      </section>

      <section className="intro-section" id="about" aria-labelledby="intro-title"><div className="container intro-grid"><Reveal className="section-heading"><h2 id="intro-title">Complex seller problems deserve practical answers.</h2></Reveal><Reveal className="intro-copy" delay={120}><p>E-commerce is full of moving parts. Messi Groups brings the operational, financial, and marketplace support you need into one focused partnership.</p><ul className="value-list"><li><CheckCircle2 size={18} /> One focused partner across setup, protection, and scale.</li><li><CheckCircle2 size={18} /> Clear next steps when the path forward feels complicated.</li><li><CheckCircle2 size={18} /> Practical support shaped around your commercial goals.</li></ul><div className="about-detail-grid"><article><strong>Protect</strong><span>Stabilize your seller foundation.</span></article><article><strong>Build</strong><span>Set up the right business structure.</span></article><article><strong>Scale</strong><span>Grow with a clearer operating plan.</span></article></div><Link className="text-link" href="#contact">Start a conversation →</Link></Reveal></div></section>

      <section className="ceo-section" aria-labelledby="ceo-title"><div className="container ceo-grid"><Reveal className="ceo-image-wrap"><div className="ceo-image-frame"><Image src="/umais-headshot.png" alt="Umais, founder of Messi Groups" fill className="ceo-image" sizes="(max-width: 800px) 90vw, 44vw" /></div></Reveal><Reveal className="ceo-copy" delay={130}><h2 id="ceo-title">Trust is built through practical results.</h2><p className="ceo-quote">“Your business deserves a partner who sees the whole picture — not just one problem at a time.”</p><p>Messi Groups helps ambitious e-commerce sellers understand the problem, organize the information, and agree the next useful action.</p><div className="ceo-principles"><article><strong>Transparency</strong><span>Clear conversations and honest next steps.</span></article><article><strong>Practical support</strong><span>Useful help shaped around the work in front of you.</span></article><article><strong>Long-term partnership</strong><span>A steady view beyond one urgent problem.</span></article></div><div className="ceo-signoff"><strong>Umais</strong><span>Founder, Messi Groups</span></div></Reveal></div></section>

      <section className="services-section" id="services" aria-labelledby="services-title"><div className="container"><Reveal className="services-heading"><div className="section-heading"><h2 id="services-title">The support behind your next stage.</h2></div><p>Eight focused services to help you solve the next business problem.</p></Reveal><ServiceGrid services={homepageServices} /><div className="services-finder-link"><span>Not sure which service you need?</span><ServiceFinder triggerLabel="Find my solution" className="button button-secondary finder-button" /></div></div></section>

      <CaseStudiesSection />

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><Reveal className="container contact-panel"><div className="contact-message"><h2 id="contact-title">Ready to solve your next business problem?</h2><p>Tell us what is blocking your business. We will help you identify the most practical next step.</p><div className="contact-journeys"><a className="button button-primary" href="#contact-form">Get My Free Seller Assessment</a><a className="button button-secondary" href="https://wa.me/923244946911" target="_blank" rel="noreferrer">Message on WhatsApp</a></div><div className="contact-quick-links"><a href="tel:+923244946911"><Phone size={16} /> Call us</a></div></div><QuickContactForm /><div className="contact-details"><div className="contact-detail"><span className="contact-icon"><MapPin size={18} /></span><div><span>Office location</span><strong>Sabzazar, Lahore, Pakistan</strong></div></div><div className="contact-detail"><span className="contact-icon"><Phone size={18} /></span><div><span>Phone / WhatsApp</span><a href="tel:+923244946911">+92 324 4946911</a></div></div><div className="contact-detail"><span className="contact-icon"><Mail size={18} /></span><div><span>Email</span><a href="mailto:messigroup67@gmail.com">messigroup67@gmail.com</a></div></div></div></Reveal></section>

      <SiteFooter /><WhatsAppWidget /><Link className="mobile-fixed-cta" href="#contact-form">Get My Free Assessment</Link>
    </main>
  );
}
