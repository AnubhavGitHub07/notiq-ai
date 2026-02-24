import { motion } from "framer-motion";
import { Bot, Code2, Brain, Trophy, Zap } from "lucide-react";

const badges = [
  { icon: <Bot size={15} />, label: "AI Powered" },
  { icon: <Code2 size={15} />, label: "Developer Focused" },
  { icon: <Brain size={15} />, label: "Smart Revision System" },
  { icon: <Trophy size={15} />, label: "Built for Interviews" },
  { icon: <Zap size={15} />, label: "Instant AI Answers" },
];

const TrustStrip = () => (
  <section className="dr-trust-strip">
    <motion.div
      className="dr-trust-badges"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          className="dr-trust-badge"
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
        >
          <span className="dr-trust-badge-icon">{b.icon}</span>
          {b.label}
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default TrustStrip;
