import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineBookOpen,
  HiOutlinePencil,
  HiOutlineSparkles,
  HiOutlineArrowRight,
} from "react-icons/hi";
import API from "../api/axios";
import "../styles/signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  const getPasswordStrength = (pass) => {
    if (!pass) return { level: 0, label: "", className: "" };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (score <= 2) return { level: 2, label: "Weak", className: "weak" };
    if (score <= 3) return { level: 3, label: "Medium", className: "medium" };
    return { level: 5, label: "Strong", className: "strong" };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      const res = await API.post("/auth/signup", { email, password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Floating decorative elements */}
      <div className="floating-element notebook-left" aria-hidden="true">
        <div className="notebook-spine"></div>
        <div className="notebook-pages"></div>
      </div>
      <div className="floating-element notebook-right" aria-hidden="true">
        <div className="notebook-spine"></div>
        <div className="notebook-pages"></div>
      </div>
      <div className="floating-element paper-stack" aria-hidden="true">
        <div className="paper-line"></div>
        <div className="paper-line"></div>
        <div className="paper-line"></div>
        <div className="paper-line"></div>
      </div>
      <div className="floating-element pencil" aria-hidden="true"></div>

      <div className="signup-container">
        {/* Left – Brand */}
        <div className="signup-brand-section">
          <div className="signup-brand-content">
            <div className="brand-header">
              <div className="brand-icon-wrapper">
                <HiOutlineBookOpen className="brand-icon" />
              </div>
              <h1 className="signup-brand-name">Notiq AI</h1>
            </div>
            
            <div className="illustration-wrapper">
              <div className="open-book-illustration">
                <div className="book-page left">
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                </div>
                <div className="book-page right">
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                </div>
                <div className="floating-pencil-icon">
                  <HiOutlinePencil />
                </div>
              </div>
            </div>

            <h2 className="signup-tagline">Where Ideas Come to Life</h2>
            <p className="signup-description">
              AI-powered notes that understand, organize, and enhance your knowledge
            </p>
            
            <div className="signup-feature-list">
              <div className="signup-feature-item">
                <div className="feature-icon-box">
                  <HiOutlineSparkles className="signup-feature-icon" />
                </div>
                <span>Smart Organization</span>
              </div>
              <div className="signup-feature-item">
                <div className="feature-icon-box">
                  <HiOutlinePencil className="signup-feature-icon" />
                </div>
                <span>AI Writing Assistant</span>
              </div>
              <div className="signup-feature-item">
                <div className="feature-icon-box">
                  <HiOutlineBookOpen className="signup-feature-icon" />
                </div>
                <span>Knowledge Library</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right – Form card */}
        <div className="signup-form-section">
          <div className="signup-card">
            <div className="signup-card-header">
              <div className="card-icon-wrapper">
                <HiOutlinePencil className="card-icon" />
              </div>
              <h2>Start Your Journey</h2>
              <p>Create your account and begin writing smarter</p>
            </div>

            {error && (
              <div className="signup-error-message">
                <HiOutlineExclamationCircle size={18} />
                {error}
              </div>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className={`signup-input-group ${focusedField === "email" ? "focused" : ""}`}>
                <label htmlFor="signup-email">
                  <HiOutlineMail className="signup-label-icon" />
                  Email Address
                </label>
                <div className="signup-input-wrapper">
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={`signup-input-group ${focusedField === "password" ? "focused" : ""}`}>
                <label htmlFor="signup-password">
                  <HiOutlineLockClosed className="signup-label-icon" />
                  Password
                </label>
                <div className="signup-input-wrapper">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
                {password && (
                  <div className="signup-strength-bar">
                    {[1, 2, 3, 4, 5].map((seg) => (
                      <div
                        key={seg}
                        className={`signup-strength-segment ${seg <= strength.level ? `active ${strength.className}` : ""}`}
                      />
                    ))}
                    <span className={`signup-strength-label ${strength.className}`}>{strength.label}</span>
                  </div>
                )}
              </div>

              <div className={`signup-input-group ${focusedField === "confirm" ? "focused" : ""}`}>
                <label htmlFor="signup-confirm">
                  <HiOutlineLockClosed className="signup-label-icon" />
                  Confirm Password
                </label>
                <div className="signup-input-wrapper">
                  <input
                    id="signup-confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField("confirm")}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="signup-submit-btn"
                disabled={loading || success}
              >
                <span className="signup-btn-content">
                  {loading ? (
                    <div className="signup-spinner" />
                  ) : success ? (
                    <span className="signup-success-check">
                      <HiOutlineCheckCircle size={20} /> Account Created!
                    </span>
                  ) : (
                    <>
                      Create Account
                      <HiOutlineArrowRight className="signup-btn-arrow" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="signup-divider">
              <span>or</span>
            </div>

            <p className="signup-login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;