import { useState, useEffect, useRef } from "react";
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
  HiOutlineArrowRight,
  HiOutlineSparkles
} from "react-icons/hi";
import API from "../api/axios";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      if (rememberMe) localStorage.setItem("userEmail", email);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
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

      <div className="login-container">
        {/* Left Side - Brand */}
        <div className="brand-section">
          <div className="brand-content">
            <div className="brand-header">
              <div className="brand-icon-wrapper">
                <HiOutlineBookOpen className="brand-icon" />
              </div>
              <h1 className="brand-name">Notiq AI</h1>
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

            <h2 className="brand-tagline">Welcome Back</h2>
            <p className="brand-description">
              Rejoin your workspace and continue your journey where you left off
            </p>
            
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <HiOutlineSparkles className="feature-icon" />
                </div>
                <span>Smart Organization</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon-box">
                  <HiOutlinePencil className="feature-icon" />
                </div>
                <span>AI Writing Assistant</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon-box">
                  <HiOutlineBookOpen className="feature-icon" />
                </div>
                <span>Knowledge Library</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="form-section">
          <div className="login-card">
            <div className="card-header">
              <div className="card-icon-wrapper">
                <HiOutlineLockClosed className="card-icon" />
              </div>
              <h2>Sign In</h2>
              <p>Access your smart library</p>
            </div>

            {error && (
              <div className="error-message">
                <HiOutlineExclamationCircle size={18} />
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                <HiOutlineCheckCircle size={18} />
                Success! Redirecting...
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className={`input-group ${focusedField === 'email' ? 'focused' : ''}`}>
                <label htmlFor="login-email">
                  <HiOutlineMail className="label-icon" />
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={`input-group ${focusedField === 'password' ? 'focused' : ''}`}>
                <label htmlFor="login-password">
                  <HiOutlineLockClosed className="label-icon" />
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading || success}
              >
                <span className="btn-content">
                  {loading ? (
                    <div className="spinner" />
                  ) : success ? (
                    <span className="success-check">
                      <HiOutlineCheckCircle size={20} /> Welcome!
                    </span>
                  ) : (
                    <>
                      Sign In
                      <HiOutlineArrowRight className="btn-arrow" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <p className="signup-link">
              New here? <Link to="/signup">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;