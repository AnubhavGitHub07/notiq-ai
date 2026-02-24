import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, ArrowRight, PlayCircle, FileText, Bot, Tag,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
};

const NoteCard = () => (
  <div className="dr-mini-card" style={{ width: 215 }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.7rem" }}>
      <FileText size={14} style={{ color: "var(--dr-primary)" }} />
      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--dr-text)", fontFamily: "var(--dr-heading-font)" }}>
        Binary Search Trees
      </span>
    </div>
    <p style={{ fontSize: "0.7rem", color: "var(--dr-muted)", lineHeight: 1.65, marginBottom: "0.7rem" }}>
      A BST where each node&apos;s left subtree has smaller values and right subtree has larger values...
    </p>
    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
      {["DSA", "Trees", "Algo"].map((t) => (
        <span
          key={t}
          style={{
            fontSize: "0.62rem", padding: "0.18rem 0.5rem",
            background: "rgba(0,194,255,0.09)", color: "var(--dr-primary)",
            borderRadius: 4, border: "1px solid rgba(0,194,255,0.2)",
          }}
        >{t}</span>
      ))}
    </div>
  </div>
);

const AICard = () => (
  <div className="dr-mini-card" style={{ width: 235 }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.7rem" }}>
      <Bot size={14} style={{ color: "var(--dr-secondary)" }} />
      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--dr-text)", fontFamily: "var(--dr-heading-font)" }}>
        AI Generated Questions
      </span>
    </div>
    {[
      "What is BST time complexity?",
      "Explain in-order traversal.",
      "When to use a balanced BST?",
    ].map((q, i) => (
      <div
        key={i}
        style={{
          fontSize: "0.68rem", color: "var(--dr-muted)", padding: "0.4rem 0",
          borderBottom: i < 2 ? "1px solid var(--dr-border)" : "none",
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: "var(--dr-secondary)", fontWeight: 700, marginRight: "0.25rem" }}>Q{i + 1}.</span>
        {q}
      </div>
    ))}
  </div>
);

const HeroSection = () => (
  <section className="dr-hero" id="hero">
    {/* Aurora Background */}
    <div className="dr-aurora-bg">
      <div className="dr-aurora-blob dr-aurora-blob-1" />
      <div className="dr-aurora-blob dr-aurora-blob-2" />
      <div className="dr-aurora-blob dr-aurora-blob-3" />
    </div>
    <div className="dr-dot-grid" />

    {/* Hero Content */}
    <motion.div className="dr-hero-content" variants={container} initial="hidden" animate="visible">
      <motion.div variants={item}>
        <span className="dr-hero-badge">
          <Sparkles size={14} />
          AI-Powered Interview Prep Platform
        </span>
      </motion.div>

      <motion.h1 className="dr-hero-title dr-heading" variants={item}>
        Master Technical<br />
        Interviews{" "}
        <span className="dr-gradient-text">with AI</span>
      </motion.h1>

      <motion.p className="dr-hero-subtitle" variants={item}>
        Store structured notes, generate AI interview questions, get instant summaries,
        and auto-tag concepts. Your ultimate prep companion for software engineering interviews.
      </motion.p>

      <motion.div className="dr-hero-ctas" variants={item}>
        <Link
          to="/signup"
          className="dr-btn-primary"
          style={{ fontSize: "1rem", padding: "0.85rem 2rem" }}
        >
          Start Preparing Free <ArrowRight size={16} />
        </Link>
        <Link
          to="/login"
          className="dr-btn-ghost"
          style={{ fontSize: "1rem", padding: "0.85rem 2rem" }}
        >
          <PlayCircle size={16} /> View Demo
        </Link>
      </motion.div>

    </motion.div>

    {/* Hero Visual — Floating Cards + Central Mockup */}
    <motion.div
      className="dr-hero-visual"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left floating card */}
      <div className="dr-float-card-left">
        <NoteCard />
      </div>

      {/* Right floating card */}
      <div className="dr-float-card-right">
        <AICard />
      </div>

      {/* Central browser mockup */}
      <div className="dr-hero-mockup-wrap">
        {/* Browser Chrome */}
        <div className="dr-mockup-chrome">
          <div className="dr-mockup-dot" style={{ background: "#FF5F56" }} />
          <div className="dr-mockup-dot" style={{ background: "#FFBD2E" }} />
          <div className="dr-mockup-dot" style={{ background: "#27C93F" }} />
          <div className="dr-mockup-url">
            <FileText size={9} />
            notiq-ai.app/dashboard
          </div>
        </div>

        {/* Dashboard Interior */}
        <div style={{ display: "flex", height: "260px" }}>
          {/* Sidebar */}
          <div style={{
            width: 155, background: "rgba(0,0,0,0.25)", borderRight: "1px solid var(--dr-border)",
            padding: "1rem 0", display: "flex", flexDirection: "column", gap: 2, flexShrink: 0,
          }}>
            <div style={{
              padding: "0 1rem 0.75rem", display: "flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.82rem", fontWeight: 700, fontFamily: "var(--dr-heading-font)",
              color: "var(--dr-text)", borderBottom: "1px solid var(--dr-border)", marginBottom: "0.25rem",
            }}>
              <span style={{ color: "var(--dr-primary)" }}>⬡</span> Notiq-AI
            </div>
            {[
              { label: "📁 Dashboard", active: false },
              { label: "📝 Notes", active: true },
              { label: "🏷️ Tags", active: false },
              { label: "🔍 Search", active: false },
              { label: "⚙️ Settings", active: false },
            ].map((it) => (
              <div
                key={it.label}
                style={{
                  padding: "0.45rem 1rem", fontSize: "0.73rem", cursor: "default",
                  color: it.active ? "var(--dr-primary)" : "var(--dr-muted)",
                  background: it.active ? "rgba(0,194,255,0.08)" : "transparent",
                  borderLeft: it.active ? "2px solid var(--dr-primary)" : "2px solid transparent",
                }}
              >{it.label}</div>
            ))}
          </div>

          {/* Main Panel */}
          <div style={{ flex: 1, padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                fontSize: "0.95rem", fontWeight: 700, color: "var(--dr-text)",
                fontFamily: "var(--dr-heading-font)",
              }}>Dynamic Programming — Complete Guide</div>
              <div style={{
                fontSize: "0.65rem", padding: "0.28rem 0.7rem", cursor: "default",
                background: "linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))",
                color: "#07080E", borderRadius: 6, fontWeight: 600,
              }}>✨ AI Summarize</div>
            </div>

            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {["DP", "Algorithms", "Memoization", "LeetCode"].map((t, i) => (
                <span key={t} style={{
                  fontSize: "0.62rem", padding: "0.2rem 0.5rem", borderRadius: 4, cursor: "default",
                  background: i % 2 === 0 ? "rgba(0,194,255,0.08)" : "rgba(124,110,234,0.08)",
                  color: i % 2 === 0 ? "var(--dr-primary)" : "var(--dr-secondary)",
                  border: `1px solid ${i % 2 === 0 ? "rgba(0,194,255,0.2)" : "rgba(124,110,234,0.2)"}`,
                }}>{t}</span>
              ))}
            </div>

            <div style={{
              background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "0.75rem",
              border: "1px solid var(--dr-border)", flex: 1,
            }}>
              <p style={{ fontSize: "0.72rem", color: "var(--dr-muted)", lineHeight: 1.75 }}>
                DP solves complex problems by breaking them into overlapping subproblems.
                <br />
                <code style={{
                  color: "var(--dr-primary)", background: "rgba(0,194,255,0.07)",
                  padding: "0.1rem 0.3rem", borderRadius: 3, fontSize: "0.68rem",
                }}>dp[i] = max(dp[i-1] + arr[i], arr[i])</code>
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div style={{
            width: 210, borderLeft: "1px solid var(--dr-border)", padding: "1.1rem",
            display: "flex", flexDirection: "column", gap: "0.6rem",
          }}>
            <div style={{
              fontSize: "0.75rem", fontWeight: 600, color: "var(--dr-text)",
              fontFamily: "var(--dr-heading-font)", display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              <Bot size={13} style={{ color: "var(--dr-secondary)" }} /> AI Questions
            </div>
            {[
              "What is the difference between top-down and bottom-up DP?",
              "Explain memoization vs tabulation.",
            ].map((q, i) => (
              <div key={i} style={{
                background: "rgba(124,110,234,0.05)", border: "1px solid rgba(124,110,234,0.12)",
                borderRadius: 7, padding: "0.55rem 0.65rem", fontSize: "0.68rem",
                color: "var(--dr-muted)", lineHeight: 1.55, cursor: "default",
              }}>
                <span style={{ color: "var(--dr-secondary)", fontWeight: 700, marginRight: "0.2rem" }}>Q{i + 1}.</span>
                {q}
              </div>
            ))}
            <div style={{
              fontSize: "0.68rem", padding: "0.5rem", textAlign: "center", cursor: "default",
              background: "linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))",
              color: "#07080E", borderRadius: 7, fontWeight: 600, marginTop: "auto",
            }}>
              Generate More
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
