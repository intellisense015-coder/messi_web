"use client";

import { BookOpen, Briefcase, Check, ChevronDown, FileText, GraduationCap, MessageCircle, Play, Search, TrendingUp, UserRound, Video } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Service } from "../lib/services";
import InteractiveEnquiryPanel from "./InteractiveEnquiryPanel";
import Reveal from "./Reveal";

const COURSE_VIDEO_SRC = "/amazon-course-mastery-hero.mp4";
const COURSE_VIDEO_POSTER = "/amazon-course-mastery-poster.jpg";

const learningOutcomes = [
  { title: "Product research", description: "Find and evaluate product opportunities.", icon: Search },
  { title: "Listings and launch", description: "Understand listings, shipment planning, and launch preparation.", icon: FileText },
  { title: "PPC and growth", description: "Learn campaign fundamentals, optimization, scaling, and ranking.", icon: TrendingUp },
  { title: "Account and client operations", description: "Build stronger habits around account work, cases, and clients.", icon: MessageCircle },
];

const courseTracks = [
  { title: "Foundations and product research", modules: ["Introduction", "Product hunting", "Product segmentation", "Validation and budget breakdown"], icon: Search },
  { title: "Listings and launch", modules: ["Listing creation", "Shipment planning", "Brand Registry", "Coupon vouchers and deals"], icon: FileText },
  { title: "PPC and growth", modules: ["PPC basics", "Campaign management", "PPC optimization", "PPC scaling", "PPC ranking"], icon: TrendingUp },
  { title: "Accounts and client work", modules: ["Amazon account creation", "Amazon case handling", "Client hunting and Upwork"], icon: Briefcase },
];

const includedItems = [
  { title: "Lifetime recorded lesson access", description: "Ask about the current lesson library and access terms.", icon: Video },
  { title: "Mentor support", description: "Understand how mentor guidance fits the current course format.", icon: MessageCircle },
  { title: "Internship opportunity", description: "Available only if the current offering confirms eligibility and terms.", icon: Briefcase },
];

const formatOptions = [
  { title: "Online training", description: "Learn remotely with the currently available course format and support details." },
  { title: "Onsite classes", description: "Ask about onsite availability, location, schedule, and current enrolment terms." },
  { title: "Live Zoom sessions", description: "Ask about live sessions, timing, and what is included in the current offering." },
];

const instructorPoints = ["Product research and validation", "Listings, launch, and PPC fundamentals", "Account operations and client-focused work"];

export default function AmazonCourseServicePage({ service }: { service: Service }) {
  const [activeTrack, setActiveTrack] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  async function toggleCourseVideo() {
    if (!videoRef.current || !COURSE_VIDEO_SRC) return;
    if (videoRef.current.paused) {
      await videoRef.current.play();
      setVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  }

  return <main className="service-content course-service-page">
    <section className="course-hero" aria-labelledby="course-hero-title">
      <div className="container course-hero-grid">
        <Reveal className="course-video-column">
          <div className="course-video-frame">
            {COURSE_VIDEO_SRC ? <><video ref={videoRef} poster={COURSE_VIDEO_POSTER} autoPlay muted loop controls preload="metadata" playsInline aria-label="Amazon Course Mastery preview video" onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)}><source src={COURSE_VIDEO_SRC} type="video/mp4" /></video><button type="button" className="course-video-play course-video-play-button" aria-label={videoPlaying ? "Pause course preview" : "Play course preview"} onClick={toggleCourseVideo}><Play size={24} fill="currentColor" /></button></> : <div className="course-video-placeholder" style={{ backgroundImage: `url(${COURSE_VIDEO_POSTER})` }}><button type="button" className="course-video-play course-video-play-button" aria-label="Course preview video placeholder" disabled><Play size={24} fill="currentColor" /></button><span className="course-video-placeholder-label">Owner course video placeholder</span></div>}
          </div>
              <p className="course-video-note">Portrait course preview · 9:16</p>
        </Reveal>
        <Reveal className="course-hero-card" delay={100}>
          <span className="course-card-icon" aria-hidden="true"><GraduationCap size={24} /></span>
          <p className="course-card-kicker">Amazon Course Mastery</p>
          <h1 id="course-hero-title">Build Stronger Amazon Skills From the Ground Up.</h1>
          <p className="course-hero-copy">Learn product research, listings, PPC, account operations, and client-focused Amazon work through practical training.</p>
          <dl className="course-meta-list"><div><dt>Course format</dt><dd>Online and/or onsite</dd></div><div><dt>Support</dt><dd>Recorded lessons and mentor guidance</dd></div></dl>
          <div className="course-hero-actions"><a className="button button-primary" href="#course-enquiry">Request Course Details</a><a className="button button-secondary" href="#course-modules">View Course Modules</a></div>
        </Reveal>
      </div>
    </section>

    <section className="course-outcomes-section" aria-labelledby="course-outcomes-title">
      <div className="container"><div className="interactive-section-title"><h2 id="course-outcomes-title">What you will learn.</h2><p>Build a practical foundation across the work Amazon operators handle every day.</p></div><div className="course-outcomes-grid">{learningOutcomes.map((item) => { const Icon = item.icon; return <article className="course-outcome-card" key={item.title}><div className="course-outcome-icon"><Icon size={27} /></div><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div>
    </section>

    <Reveal className="course-modules-section" id="course-modules" aria-labelledby="course-modules-title">
      <div className="container"><div className="interactive-section-title"><h2 id="course-modules-title">Explore the course modules.</h2><p>Open one learning track at a time to keep the path easy to scan.</p></div><div className="course-modules-layout"><div className="course-track-list">{courseTracks.map((track, index) => { const Icon = track.icon; const isOpen = activeTrack === index; return <div className={`course-track ${isOpen ? "is-open" : ""}`} key={track.title}><button type="button" className="course-track-trigger" aria-expanded={isOpen} onClick={() => setActiveTrack(isOpen ? -1 : index)}><span className="course-track-icon"><Icon size={20} /></span><span className="course-track-label"><small>Track {String(index + 1).padStart(2, "0")} · {track.modules.length} modules</small><strong>{track.title}</strong></span><ChevronDown size={19} className="course-track-chevron" /></button>{isOpen && <div className="course-track-content"><ul>{track.modules.map((module) => <li key={module}><Check size={15} />{module}</li>)}</ul></div>}</div>; })}</div><div className="course-module-summary"><div className="course-module-summary-icon"><BookOpen size={28} /></div><span>Learning path</span><strong>From foundations to client work.</strong><p>Topics are organized to help you move from research and listings into operations, PPC, and practical client delivery.</p><div className="course-module-progress" aria-hidden="true"><span style={{ width: `${((activeTrack + 1) / courseTracks.length) * 100}%` }} /></div><small>{activeTrack >= 0 ? `Track ${String(activeTrack + 1).padStart(2, "0")} selected` : "Choose a track to explore"}</small></div></div></div>
    </Reveal>

    <section className="course-included-section" aria-labelledby="course-included-title">
      <div className="container"><div className="interactive-section-title"><h2 id="course-included-title">Included with the course.</h2></div><div className="course-included-grid">{includedItems.map((item) => { const Icon = item.icon; return <article className="course-included-card" key={item.title}><div className="course-included-icon"><Icon size={25} /></div><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div>
    </section>

    <section className="course-format-section" aria-labelledby="course-format-title">
      <div className="container course-format-grid"><div className="course-format-copy"><div className="interactive-section-title"><h2 id="course-format-title">Choose a course format.</h2><p>Availability, timing, and fees are confirmed through enquiry.</p></div><div className="course-format-tabs" role="tablist" aria-label="Course formats">{formatOptions.map((option, index) => <button type="button" role="tab" aria-selected={selectedFormat === index} className={selectedFormat === index ? "is-selected" : ""} key={option.title} onClick={() => setSelectedFormat(index)}>{selectedFormat === index && <Check size={16} />}{option.title}</button>)}</div></div><div className="course-format-panel" role="tabpanel" aria-live="polite"><span>Selected format</span><h3>{formatOptions[selectedFormat].title}</h3><p>{formatOptions[selectedFormat].description}</p><a className="text-link" href="#course-enquiry">Request Course Details <span>→</span></a></div></div>
    </section>

    <section className="course-instructor-section" aria-labelledby="course-instructor-title">
      <div className="container course-instructor-grid"><Reveal className="course-instructor-media"><Image src="/umais-headshot.png" alt="Messi Groups course instructor" width={900} height={900} /><span className="course-instructor-play"><Play size={19} fill="currentColor" /></span></Reveal><Reveal className="course-instructor-copy" delay={100}><div className="course-card-icon" aria-hidden="true"><UserRound size={23} /></div><h2 id="course-instructor-title">Learn from someone who works inside the process.</h2><p>Ask about the instructor’s current teaching focus and how practical Amazon work is brought into the course.</p><ul>{instructorPoints.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul></Reveal></div>
    </section>

    <InteractiveEnquiryPanel service={service} />

    <section className="course-faq-section" aria-labelledby="course-faq-title"><div className="container service-faq-layout"><div><h2 id="course-faq-title">Common questions.</h2></div><div className="course-faq-list">{service.faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<ChevronDown size={18} /></summary><p>{faq.answer}</p></details>)}</div></div></section>
  </main>;
}
