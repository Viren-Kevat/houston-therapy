import { AuroraBackground } from "@/components/ui/aurora-background";
import { Navbar } from "@/components/navbar";
import { HeroBanner } from "@/components/hero-banner";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { FaqSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FeedbackPopover } from "@/components/feedback-popover";
import { Footer } from "@/components/footer";

function App() {
  return (
    <div className="app" id="app-root">
      {/* Navbar — fixed, site-wide */}
      <Navbar />

      {/* Feedback Popover — appears on scroll */}
      <FeedbackPopover />

      {/* Hero Section with Aurora Background */}
      <AuroraBackground showRadialGradient={true}>
        <HeroBanner />
      </AuroraBackground>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
