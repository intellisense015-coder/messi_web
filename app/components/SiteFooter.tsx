import Image from "next/image";
import Link from "next/link";

function BrandLogo() {
  return (
    <Link className="brand-logo brand-logo-compact" href="/#top" aria-label="Messi Groups home">
      <Image src="/messi-logo-transparent.png" alt="Messi Groups" width={116} height={98} className="brand-logo-image" />
    </Link>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <BrandLogo />
          <p>Messi Groups helps Amazon sellers and e-commerce founders protect their operations, build stronger business foundations, and scale with confidence.</p>
          <Link className="footer-cta" href="/#contact">Talk to Messi Groups</Link>
        </div>
        <div className="footer-links">
          <span>Explore</span>
          <Link href="/services">Services</Link>
          <Link href="/#about">About us</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <div className="footer-links footer-social">
          <span>Connect</span>
          <a href="https://www.instagram.com/messigroup67/" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" className="social-dot" /></svg> Instagram</a>
          <a href="https://www.facebook.com/Umaisbaig67/" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H8.4V13h2.7v8h3.1Z" /></svg> Facebook</a>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Messi Groups. All rights reserved.</span><span>Built for ambitious sellers. <a href="https://intellisense.cloud" target="_blank" rel="noreferrer">Powered by Intellisense</a></span></div>
    </footer>
  );
}
