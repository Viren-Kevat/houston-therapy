"use client";
import { motion } from "framer-motion";
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  Shield,
  Heart,
  Brain,
  Sparkles,
} from "lucide-react";
import heroImage from "@/assets/hero-therapy.png";

const specialties = [
  { icon: Brain, label: "Anxiety & ADHD" },
  { icon: Heart, label: "Trauma & PTSD" },
  { icon: Shield, label: "Depression" },
  { icon: Sparkles, label: "Couples & Family" },
];

export function HeroBanner() {
  return (
    <section id="hero-banner" className="hero-banner">
      {/* Left Content Side */}
      <div className="hero-content">
        <motion.div
          className="hero-content-inner"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hero-badge-dot" />
            Houston's Home for Mental Health
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Therapy Tailored to How You{" "}
            <span className="gradient-text">Think, Feel,</span> and{" "}
            <span className="gradient-text">Live</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            We provide therapy in Houston for anxiety, ADHD, trauma,
            relationship issues, and personal growth. Our therapists work with
            adults and teens using structured, personalized approaches to help
            you make meaningful, lasting change.
          </motion.p>

          {/* Specialty Tags */}
          <motion.div
            className="hero-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {specialties.map((spec, i) => (
              <motion.div
                key={spec.label}
                className="hero-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <spec.icon size={16} />
                <span>{spec.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a href="#schedule" className="btn-primary">
              <CalendarCheck size={18} />
              Schedule a Session
              <ArrowRight size={16} />
            </a>
            <a href="tel:713-936-2561" className="btn-secondary">
              <Phone size={18} />
              Call 713-936-2561
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="hero-trust-item">
              <span className="hero-trust-number">12+</span>
              <span className="hero-trust-label">Expert Therapists</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-number">18+</span>
              <span className="hero-trust-label">Specializations</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-number">Mon-Fri</span>
              <span className="hero-trust-label">8AM – 9PM</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Image Side */}
      <motion.div
        className="hero-image-wrapper"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="hero-image-container">
          <img
            src={heroImage}
            alt="Modern therapy office at Houston Therapy — calm, inviting consultation room with natural lighting"
            className="hero-image"
          />
          {/* Floating accent card */}
          <motion.div
            className="hero-floating-card"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="hero-floating-card-icon">
              <Heart size={20} fill="currentColor" />
            </div>
            <div>
              <div className="hero-floating-card-title">
                A More Meaningful Life
              </div>
              <div className="hero-floating-card-subtitle">Awaits you here</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        .hero-banner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          align-items: center;
          gap: var(--space-2xl);
          max-width: 1400px;
          margin: 0 auto;
          padding: calc(72px + var(--space-2xl)) var(--space-xl) var(--space-2xl);
          position: relative;
          z-index: 10;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-content-inner {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: 6px 16px;
          background: var(--color-primary-50);
          border: 1px solid var(--color-primary-100);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
          width: fit-content;
          letter-spacing: 0.02em;
        }

        .hero-badge-dot {
          width: 8px;
          height: 8px;
          background: var(--color-primary);
          border-radius: 50%;
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .hero-heading {
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          color: var(--color-text);
          letter-spacing: -0.02em;
        }

        .hero-subtext {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: var(--color-text-secondary);
          line-height: 1.8;
          max-width: 540px;
        }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          cursor: default;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .hero-tag:hover {
          border-color: var(--color-primary-100);
          color: var(--color-primary);
          box-shadow: var(--shadow-md);
        }

        .hero-tag svg {
          color: var(--color-primary);
        }

        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
          padding-top: var(--space-sm);
        }

        .hero-trust {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          padding-top: var(--space-md);
        }

        .hero-trust-item {
          display: flex;
          flex-direction: column;
        }

        .hero-trust-number {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-primary);
          font-family: var(--font-heading);
        }

        .hero-trust-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .hero-trust-divider {
          width: 1px;
          height: 32px;
          background: var(--color-border);
        }

        /* Right side image */
        .hero-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-image-container {
          position: relative;
          width: 100%;
          max-width: 560px;
          border-radius: var(--radius-xl);
          overflow: visible;
        }

        .hero-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
        }

        .hero-floating-card {
          position: absolute;
          bottom: -20px;
          left: -30px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .hero-floating-card-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100));
          border-radius: 12px;
          color: var(--color-primary);
        }

        .hero-floating-card-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-text);
        }

        .hero-floating-card-subtitle {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        /* Responsive */
        @media (max-width: 968px) {
          .hero-banner {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: var(--space-xl);
          }

          .hero-content-inner {
            align-items: center;
          }

          .hero-badge {
            margin: 0 auto;
          }

          .hero-subtext {
            margin: 0 auto;
          }

          .hero-tags {
            justify-content: center;
          }

          .hero-cta {
            justify-content: center;
          }

          .hero-trust {
            justify-content: center;
          }

          .hero-image-wrapper {
            order: -1;
          }

          .hero-image {
            height: 350px;
          }

          .hero-floating-card {
            bottom: -15px;
            left: 10px;
          }
        }

        @media (max-width: 480px) {
          .hero-heading {
            font-size: 1.8rem;
          }

          .hero-cta {
            flex-direction: column;
            width: 100%;
          }

          .hero-cta .btn-primary,
          .hero-cta .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-trust {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
