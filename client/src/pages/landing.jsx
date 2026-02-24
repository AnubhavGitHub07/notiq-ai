import Navbar from "../components/landing/Navbar.jsx";
import HeroSection from "../components/landing/HeroSection.jsx";
import TrustStrip from "../components/landing/TrustStrip.jsx";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import DemoPreview from "../components/landing/DemoPreview.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import LandingFooter from "../components/landing/LandingFooter.jsx";
import "../styles/landing.css";

const Landing = () => (
  <div className="dr-page">
    <Navbar />
    <HeroSection />
    <TrustStrip />
    <FeaturesSection />
    <HowItWorks />
    <DemoPreview />
    <CTASection />
    <LandingFooter />
  </div>
);

export default Landing;
