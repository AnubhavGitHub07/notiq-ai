import { motion } from "framer-motion";
import {
  MessageSquareText, Wand2, Tag, NotepadText, Paperclip, ListFilter,
} from "lucide-react";

const features = [
  {
    icon: <MessageSquareText size={22} />,
    title: "AI Question Generator",
    desc: "Automatically generate tailored interview questions directly from your notes. Get questions matched to your exact knowledge level and topic.",
    accent: "primary",
  },
  {
    icon: <Wand2 size={22} />,
    title: "AI Summarizer",
    desc: "Transform lengthy notes into concise, actionable summaries in seconds. Perfect for last-minute revision before your interview.",
    accent: "secondary",
  },
  {
    icon: <Tag size={22} />,
    title: "Auto Tag Generator",
    desc: "AI analyzes your content and suggests relevant tags automatically, making organization effortless and search lightning-fast.",
    accent: "primary",
  },
  {
    icon: <NotepadText size={22} />,
    title: "Structured Notes System",
    desc: "Create rich, structured notes with code blocks, markdown support, and hierarchical organization designed for technical concepts.",
    accent: "secondary",
  },
  {
    icon: <Paperclip size={22} />,
    title: "Attachments Support",
    desc: "Attach images, PDFs, and reference documents directly to your notes. Keep all study materials in one organized workspace.",
    accent: "primary",
  },
  {
    icon: <ListFilter size={22} />,
    title: "Smart Filtering",
    desc: "Filter and search your entire knowledge base by tags, topics, date, or content. Find exactly what you need in milliseconds.",
    accent: "secondary",
  },
];

const FeaturesSection = () => (
  <section className="dr-section" id="features">
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="dr-section-label">Capabilities</span>
      <h2 className="dr-section-title dr-heading">
        Everything You Need to{" "}
        <span className="dr-gradient-text">Ace Interviews</span>
      </h2>
      <p className="dr-section-subtitle">
        A complete AI-powered toolkit for developer interview preparation — intelligent, fast, and built for engineers.
      </p>
    </motion.div>

    <div className="dr-features-grid">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          className="dr-feature-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: i * 0.07 }}
          whileHover={{ y: -6 }}
        >
          <div
            className="dr-feature-icon-wrap"
            style={f.accent === "secondary" ? {
              background: "linear-gradient(135deg, var(--dr-secondary) 0%, #9D8FF5 100%)",
              boxShadow: "0 4px 18px var(--dr-secondary-glow)",
            } : {}}
          >
            {f.icon}
          </div>
          <h3 className="dr-feature-title">{f.title}</h3>
          <p className="dr-feature-desc">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
