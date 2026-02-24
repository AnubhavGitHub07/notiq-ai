import { motion } from "framer-motion";
import { NotepadText, BrainCircuit, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    Icon: NotepadText,
    title: "Write Your Notes",
    desc: "Capture concepts, algorithms, system design notes, and code snippets in a structured, searchable workspace.",
  },
  {
    num: "02",
    Icon: BrainCircuit,
    title: "AI Understands Concepts",
    desc: "Our AI analyzes your notes, creates concise summaries, generates targeted questions, and auto-applies smart tags.",
  },
  {
    num: "03",
    Icon: Rocket,
    title: "Prepare Smarter",
    desc: "Practice with AI-generated interview questions and revise with instant summaries before your interview day.",
  },
];

const HowItWorks = () => {
  const elements = [];
  steps.forEach((step, i) => {
    elements.push(
      <motion.div
        key={step.num}
        className="dr-step-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: i * 0.14 }}
        whileHover={{ y: -4 }}
      >
        <div className="dr-step-num">{step.num}</div>
        <div className="dr-step-icon">
          <step.Icon size={28} style={{ color: "var(--dr-secondary)" }} />
        </div>
        <h3 className="dr-step-title">{step.title}</h3>
        <p className="dr-step-desc">{step.desc}</p>
      </motion.div>
    );
    if (i < steps.length - 1) {
      elements.push(
        <div key={`conn-${i}`} className="dr-step-connector">
          <div className="dr-step-connector-line" />
        </div>
      );
    }
  });

  return (
    <section
      className="dr-section"
      id="how-it-works"
      style={{ background: "rgba(255,255,255,0.012)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="dr-section-label">Simple Process</span>
        <h2 className="dr-section-title dr-heading">
          From Notes to{" "}
          <span className="dr-gradient-text">Interview Ready</span>
        </h2>
        <p className="dr-section-subtitle">
          Three simple steps to transform your study sessions into interview success — powered by AI.
        </p>
      </motion.div>

      <div className="dr-steps-row">{elements}</div>
    </section>
  );
};

export default HowItWorks;
