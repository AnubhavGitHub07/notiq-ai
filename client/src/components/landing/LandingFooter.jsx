import { Link } from "react-router-dom";
import { BrainCircuit, Github, Twitter, Linkedin } from "lucide-react";

const productLinks = ["Features", "How It Works", "Pricing", "Changelog"];
const resourceLinks = ["Documentation", "Blog", "Interview Tips", "DSA Guide"];
const companyLinks = ["About", "Contact", "Privacy Policy", "Terms of Service"];

const socialLinks = [
  { icon: <Github size={16} />, href: "#", label: "GitHub" },
  { icon: <Twitter size={16} />, href: "#", label: "Twitter" },
  { icon: <Linkedin size={16} />, href: "#", label: "LinkedIn" },
];

const LandingFooter = () => (
  <footer className="dr-footer" id="about">
    <div className="dr-footer-grid">
      {/* Brand Column */}
      <div>
        <div className="dr-footer-logo">
          <BrainCircuit size={22} style={{ color: "var(--dr-primary)" }} />
          Notiq-AI
        </div>
        <p className="dr-footer-tagline">
          AI-powered interview prep designed for developers. Store notes, generate questions, get summaries,
          and ace your next technical interview.
        </p>
        <div className="dr-footer-socials">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} className="dr-social-link" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Product */}
      <div>
        <h4 className="dr-footer-col-title">Product</h4>
        <ul className="dr-footer-links">
          {productLinks.map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="dr-footer-col-title">Resources</h4>
        <ul className="dr-footer-links">
          {resourceLinks.map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="dr-footer-col-title">Company</h4>
        <ul className="dr-footer-links">
          {companyLinks.map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      </div>
    </div>

    {/* Footer Bottom Bar */}
    <div className="dr-footer-bottom">
      <span>© 2026 Notiq-AI. All rights reserved.</span>
      <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <span style={{ color: "var(--dr-primary)" }}>⚡</span>
        Built for developers.
      </span>
    </div>
  </footer>
);

export default LandingFooter;
