import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Pricing", id: "pricing" },
  { label: "About", id: "about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={`dr-nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <Link to="/" className="dr-nav-logo">
        <BrainCircuit size={24} className="dr-nav-logo-icon" style={{ color: "var(--dr-primary)" }} />
        Notiq-AI
      </Link>

      {/* Desktop Nav Links */}
      <div className="dr-nav-links">
        {navLinks.map((link) => (
          <button key={link.id} className="dr-nav-link" onClick={() => scrollTo(link.id)}>
            {link.label}
          </button>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="dr-nav-ctas">
        <Link to="/login" className="dr-btn-ghost" style={{ fontSize: "0.875rem", padding: "0.55rem 1.25rem" }}>
          Login
        </Link>
        <Link to="/signup" className="dr-btn-primary" style={{ fontSize: "0.875rem", padding: "0.55rem 1.25rem" }}>
          Get Started
        </Link>
        <button className="dr-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="dr-mobile-menu open"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                className="dr-nav-link"
                style={{ fontSize: "1rem", padding: "0.75rem 0" }}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
            <div style={{ display: "flex", gap: "0.65rem", marginTop: "0.75rem" }}>
              <Link to="/login" className="dr-btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="dr-btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
