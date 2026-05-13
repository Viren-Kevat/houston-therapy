"use client";
import { motion } from "framer-motion";
import {
  User,
  Users,
  Heart,
  Brain,
  GraduationCap,
  Briefcase,
  Baby,
  Shield,
} from "lucide-react";

const services = [
  {
    icon: User,
    title: "Individual Therapy",
    tagline: "A Happier, Healthier You",
    description:
      "Personalized one-on-one therapy to explore your thoughts, feelings, and actions for deeper self-understanding.",
  },
  {
    icon: Heart,
    title: "Couples Counseling",
    tagline: "Build Strong Relationships",
    description:
      "Build trust, improve communication, and strengthen your relationship with practical, lasting tools.",
  },
  {
    icon: Users,
    title: "Family Therapy",
    tagline: "Navigate Relationship Dynamics",
    description:
      "Work together as a family to improve communication, resolve conflicts, and deepen understanding.",
  },
  {
    icon: Brain,
    title: "Psychological Assessment",
    tagline: "Gain A Deeper Understanding",
    description:
      "Comprehensive evaluations including ADHD, autism, learning disabilities, mood disorders, and diagnostic clarification.",
  },
  {
    icon: Baby,
    title: "Teen Counseling",
    tagline: "Establish A Strong Sense of Self",
    description:
      "Helping teens navigate anxiety, identity, peer pressure, and emotional challenges in a safe environment.",
  },
  {
    icon: Briefcase,
    title: "Career Counseling",
    tagline: "Direction and Coaching",
    description:
      "Professional guidance to help you identify goals, navigate transitions, and build a fulfilling career path.",
  },
  {
    icon: Shield,
    title: "EMDR & Trauma Therapy",
    tagline: "Process and Heal",
    description:
      "Evidence-based trauma processing techniques including EMDR and Brainspotting for lasting recovery.",
  },
  {
    icon: GraduationCap,
    title: "Group Therapy",
    tagline: "Improve Interpersonal Skills",
    description:
      "Group sessions to improve interpersonal relationships, build social skills, and find shared understanding.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function ServicesSection() {
  return (
    <section className="services-section" id="services-section">
      <div className="section-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="services-label">Our Services</span>
          <h2 className="section-title">
            Comprehensive Mental Health{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Houston Therapy provides counseling for individuals, couples, and
            families. We offer psychological assessments, group therapy, career
            counseling, and more.
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
            >
              <div className="service-icon">
                <service.icon size={24} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-tagline">{service.tagline}</p>
              <p className="service-description">{service.description}</p>
              <a href="#" className="service-link">
                Learn More →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .services-section {
          background: var(--color-bg-alt);
          position: relative;
          overflow: hidden;
        }

        .services-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(45, 125, 111, 0.06), transparent);
          border-radius: 50%;
        }

        .services-header {
          text-align: center;
          margin-bottom: var(--space-3xl);
        }

        .services-label {
          display: inline-block;
          padding: 6px 16px;
          background: var(--color-primary-50);
          color: var(--color-primary);
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          margin-bottom: var(--space-md);
          letter-spacing: 0.03em;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-lg);
        }

        .service-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          transition: all var(--transition-base);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          cursor: pointer;
        }

        .service-card:hover {
          border-color: var(--color-primary-100);
        }

        .service-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100));
          border-radius: 14px;
          color: var(--color-primary);
          margin-bottom: var(--space-xs);
        }

        .service-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-text);
        }

        .service-tagline {
          font-size: 0.85rem;
          color: var(--color-primary);
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .service-description {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          flex: 1;
        }

        .service-link {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding-top: var(--space-sm);
          transition: gap var(--transition-fast);
        }

        .service-link:hover {
          gap: 8px;
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
