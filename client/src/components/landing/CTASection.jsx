import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

const CTASection = () => (
  <section className="dr-cta-section" id="pricing">
    <div className="dr-cta-bg" />
    <div className="dr-cta-glow" />
    <div className="dr-cta-glow-2" />

    <motion.div
      className="dr-cta-content"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="dr-cta-title dr-heading">
        Ready to Level Up Your{" "}
        <span className="dr-gradient-text">Interview Preparation?</span>
      </h2>
      <p className="dr-cta-subtitle">
        Join hundreds of developers using Notiq-AI to ace their technical interviews.
      </p>

      <div className="dr-cta-buttons">
        <Link
          to="/signup"
          className="dr-btn-primary"
          style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem" }}
        >
          Start Free <ArrowRight size={17} />
        </Link>
        <Link
          to="/login"
          className="dr-btn-ghost"
          style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem" }}
        >
          Login to Continue
        </Link>
      </div>

      <p className="dr-cta-note">
        <ShieldCheck size={14} style={{ color: "var(--dr-primary)" }} />
        No credit card required · Free forever plan available · Cancel anytime
      </p>
    </motion.div>
  </section>
);

export default CTASection;
