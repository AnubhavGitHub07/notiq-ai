import { motion } from "framer-motion";
import { Globe, Bot, BrainCircuit } from "lucide-react";

const sidebarItems = [
  { label: "📁 Dashboard", active: false },
  { label: "📝 Notes", active: true },
  { label: "🏷️ Tags", active: false },
  { label: "🔍 Search", active: false },
  { label: "⚙️ Settings", active: false },
];

const noteTags = [
  { label: "System Design", accent: "primary" },
  { label: "Load Balancer", accent: "secondary" },
  { label: "Scalability", accent: "primary" },
  { label: "Backend", accent: "secondary" },
  { label: "AWS", accent: "primary" },
];

const aiQuestions = [
  "What are the differences between L4 and L7 load balancers?",
  "How does a least-connections algorithm decide where to route traffic?",
  "Explain sticky sessions — when would you avoid them?",
  "What role does a health check play in load balancing?",
];

const bulletPoints = [
  "Round Robin — distributes requests sequentially across servers",
  "Least Connections — routes to server with fewest active connections",
  "IP Hash — ensures session persistence based on client IP",
];

const DemoPreview = () => (
  <section className="dr-section" id="demo" style={{ paddingTop: "2rem" }}>
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="dr-section-label">Live Preview</span>
      <h2 className="dr-section-title dr-heading">
        Your AI-Powered{" "}
        <span className="dr-gradient-text">Study Dashboard</span>
      </h2>
      <p className="dr-section-subtitle">
        A workspace designed for developers — organize notes, generate interview questions, and prepare efficiently.
      </p>
    </motion.div>

    <motion.div
      className="dr-demo-window"
      initial={{ opacity: 0, y: 44, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Browser Chrome */}
      <div className="dr-demo-chrome">
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
        <div className="dr-demo-chrome-url">
          <Globe size={10} />
          notiq-ai.app/dashboard
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="dr-demo-body">

        {/* Sidebar */}
        <div className="dr-demo-sidebar">
          <div style={{
            padding: "0.75rem 1.1rem 0.9rem",
            display: "flex", alignItems: "center", gap: "0.45rem",
            fontSize: "0.88rem", fontWeight: 700, fontFamily: "var(--dr-heading-font)",
            color: "var(--dr-text)", borderBottom: "1px solid var(--dr-border)", marginBottom: "0.35rem",
          }}>
            <BrainCircuit size={16} style={{ color: "var(--dr-primary)" }} />
            Notiq-AI
          </div>

          {sidebarItems.map((item) => (
            <div
              key={item.label}
              style={{
                padding: "0.55rem 1.1rem", fontSize: "0.78rem", cursor: "default",
                color: item.active ? "var(--dr-primary)" : "var(--dr-muted)",
                background: item.active ? "rgba(0,194,255,0.08)" : "transparent",
                borderLeft: item.active ? "2px solid var(--dr-primary)" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >{item.label}</div>
          ))}

          <div style={{ padding: "1rem 1.1rem", marginTop: "auto" }}>
            <div style={{ height: 1, background: "var(--dr-border)", marginBottom: "0.9rem" }} />
            <div style={{ fontSize: "0.7rem", color: "var(--dr-muted)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--dr-text)", marginBottom: "0.2rem" }}>
                Alex Kumar
              </div>
              alex@notiq-ai.app
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dr-demo-main">
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div style={{
                fontSize: "1.05rem", fontWeight: 700, color: "var(--dr-text)",
                fontFamily: "var(--dr-heading-font)", marginBottom: "0.2rem",
              }}>
                System Design: Load Balancing
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--dr-muted)" }}>Last updated 2 hours ago · 847 words</div>
            </div>
            <div style={{ display: "flex", gap: "0.45rem", flexShrink: 0 }}>
              <div style={{
                fontSize: "0.68rem", padding: "0.3rem 0.7rem", cursor: "default",
                border: "1px solid var(--dr-border)", color: "var(--dr-muted)", borderRadius: 6,
              }}>Edit</div>
              <div style={{
                fontSize: "0.68rem", padding: "0.3rem 0.7rem", cursor: "default",
                background: "linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))",
                color: "#07080E", borderRadius: 6, fontWeight: 600,
              }}>✨ AI Summarize</div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {noteTags.map((t) => (
              <span key={t.label} style={{
                fontSize: "0.65rem", padding: "0.22rem 0.55rem", borderRadius: 4, cursor: "default",
                background: t.accent === "primary" ? "rgba(0,194,255,0.08)" : "rgba(124,110,234,0.08)",
                color: t.accent === "primary" ? "var(--dr-primary)" : "var(--dr-secondary)",
                border: `1px solid ${t.accent === "primary" ? "rgba(0,194,255,0.2)" : "rgba(124,110,234,0.2)"}`,
              }}>{t.label}</span>
            ))}
            <span style={{
              fontSize: "0.65rem", padding: "0.22rem 0.55rem", borderRadius: 4, cursor: "default",
              background: "rgba(255,255,255,0.03)", color: "var(--dr-muted)",
              border: "1px solid var(--dr-border)",
            }}>+ Add Tag</span>
          </div>

          {/* Note Content */}
          <div style={{
            background: "rgba(255,255,255,0.02)", borderRadius: 10,
            padding: "1rem 1.1rem", border: "1px solid var(--dr-border)", flex: 1, overflow: "auto",
          }}>
            <p style={{ fontSize: "0.78rem", color: "var(--dr-muted)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
              <strong style={{ color: "var(--dr-text)" }}>Load balancing</strong> distributes incoming
              network traffic across multiple backend servers to ensure no single server bears too much demand,
              improving reliability and availability.
            </p>
            <div style={{ marginBottom: "0.5rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--dr-text)", marginBottom: "0.45rem" }}>
                Key Algorithms:
              </p>
              {bulletPoints.map((bp) => (
                <div key={bp} style={{
                  display: "flex", gap: "0.45rem", alignItems: "flex-start",
                  fontSize: "0.73rem", color: "var(--dr-muted)", marginBottom: "0.35rem", lineHeight: 1.55,
                }}>
                  <span style={{ color: "var(--dr-primary)", marginTop: 2, flexShrink: 0 }}>›</span>
                  {bp}
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary Block */}
          <div style={{
            background: "rgba(0,194,255,0.04)", borderRadius: 10, padding: "0.75rem 1rem",
            border: "1px solid rgba(0,194,255,0.13)", flexShrink: 0,
          }}>
            <div style={{
              fontSize: "0.7rem", fontWeight: 600, color: "var(--dr-primary)",
              marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              <Bot size={12} /> AI Summary
            </div>
            <p style={{ fontSize: "0.73rem", color: "var(--dr-muted)", lineHeight: 1.68 }}>
              Load balancing ensures high availability by distributing traffic using algorithms like Round Robin,
              Least Connections, or IP Hash. Essential for building fault-tolerant, horizontally scalable systems.
            </p>
          </div>
        </div>

        {/* Right Panel — AI Questions */}
        <div className="dr-demo-panel">
          <div style={{
            fontSize: "0.78rem", fontWeight: 600, color: "var(--dr-text)",
            fontFamily: "var(--dr-heading-font)", display: "flex", alignItems: "center", gap: "0.45rem",
          }}>
            <Bot size={14} style={{ color: "var(--dr-secondary)" }} /> AI Questions
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1, overflow: "auto" }}>
            {aiQuestions.map((q, i) => (
              <div key={i} style={{
                background: "rgba(124,110,234,0.05)", border: "1px solid rgba(124,110,234,0.13)",
                borderRadius: 9, padding: "0.6rem 0.7rem", fontSize: "0.72rem",
                color: "var(--dr-muted)", lineHeight: 1.6, cursor: "default",
              }}>
                <span style={{ color: "var(--dr-secondary)", fontWeight: 700, marginRight: "0.25rem" }}>Q{i + 1}.</span>
                {q}
              </div>
            ))}
          </div>

          <div style={{
            fontSize: "0.73rem", padding: "0.6rem", textAlign: "center",
            background: "linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))",
            color: "#07080E", borderRadius: 8, fontWeight: 600, cursor: "default",
          }}>
            Generate More Questions
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default DemoPreview;
