"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 36);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link className="brand-logo" href="/#top" aria-label="Messi Groups home">
          <Image src="/messi-logo-transparent.png" alt="Messi Groups" width={148} height={124} className="brand-logo-image" priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="/#results" onClick={() => setMenuOpen(false)}>Results</Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
        </nav>
        <div className="header-actions">
          <Link className="header-cta" href="/#contact-form">Get My Free Seller Assessment</Link>
          <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? "Close" : "Menu"}</button>
        </div>
      </div>
      {menuOpen ? <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation"><Link href="/#services" onClick={() => setMenuOpen(false)}>Services</Link><Link href="/#about" onClick={() => setMenuOpen(false)}>How It Works</Link><Link href="/#results" onClick={() => setMenuOpen(false)}>Results</Link><Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link><Link className="mobile-nav-cta" href="/#contact-form" onClick={() => setMenuOpen(false)}>Get My Free Seller Assessment</Link></nav> : null}
    </header>
  );
}
