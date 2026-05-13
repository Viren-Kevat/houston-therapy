"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Quote, Star } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Client",
    company: "Individual Therapy",
    content:
      "Houston Therapy completely changed my perspective on mental health. Dr. Katz helped me understand patterns I'd been struggling with for years. The integrative approach felt personalized — not a one-size-fits-all solution. I finally feel like I have the tools to manage my anxiety.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "James & Lisa R.",
    role: "Clients",
    company: "Couples Counseling",
    content:
      "We were on the brink of separation when we started couples counseling. Our therapist helped us rebuild communication and trust in ways we didn't think were possible. We're stronger now than we've been in years. We're so grateful for the safe space they created for us.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Michelle T.",
    role: "Client",
    company: "EMDR Therapy",
    content:
      "After years of living with PTSD, EMDR therapy at Houston Therapy gave me my life back. The trauma that used to control my daily life no longer has the same grip. My therapist was compassionate, patient, and incredibly skilled. I can't recommend them enough.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "David K.",
    role: "Client",
    company: "ADHD Assessment",
    content:
      "Getting a proper ADHD assessment as an adult was life-changing. The neuropsychological evaluation was thorough, and the team explained everything clearly. For the first time, I understood why I struggled — and more importantly, how to work with my brain instead of against it.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Swipe handlers
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50;
      if (info.offset.x < -swipeThreshold) {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      } else if (info.offset.x > swipeThreshold) {
        setActiveIndex(
          (current) =>
            (current - 1 + testimonials.length) % testimonials.length
        );
      }
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="testimonials-section"
    >
      <div className="testimonials-container">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="testimonials-grid"
        >
          {/* Left side: Heading and navigation */}
          <motion.div variants={itemVariants} className="testimonials-left">
            <div className="testimonials-left-inner">
              <span className="testimonials-badge">
                <Star className="testimonials-badge-star" />
                <span>What Our Clients Say</span>
              </span>

              <h2 className="testimonials-heading">
                Real Stories, Real Change
              </h2>

              <p className="testimonials-subtitle">
                Our clients' experiences speak to the impact of personalized,
                compassionate therapy. Every journey is unique — here are a few
                of theirs.
              </p>

              <div className="testimonials-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`testimonials-dot ${activeIndex === index ? "active" : ""}`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side: Testimonial cards with swipe */}
          <motion.div
            variants={itemVariants}
            className="testimonials-right"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{ cursor: "grab", touchAction: "pan-y" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card-wrapper"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  zIndex: activeIndex === index ? 10 : 0,
                  pointerEvents: activeIndex === index ? "auto" : "none",
                }}
              >
                <div className="testimonial-card">
                  <div className="testimonial-stars">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="testimonial-star" />
                      ))}
                  </div>

                  <div className="testimonial-quote-wrapper">
                    <Quote className="testimonial-quote-icon" />
                    <p className="testimonial-content">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <Separator className="testimonial-separator" />

                  <div className="testimonial-author">
                    <Avatar className="testimonial-avatar">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="testimonial-name">{testimonial.name}</h3>
                      <p className="testimonial-role">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Swipe hint on mobile */}
            <div className="testimonial-swipe-hint">
              ← Swipe to navigate →
            </div>

            {/* Decorative elements */}
            <div className="testimonial-decor-1" />
            <div className="testimonial-decor-2" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .testimonials-section {
          padding: 5rem 0;
          overflow: hidden;
          background-color: var(--color-bg);
          font-family: var(--font-sans);
        }

        .testimonials-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        /* Left side */
        .testimonials-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .testimonials-left-inner {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .testimonials-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          background: var(--color-primary-50);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
          width: fit-content;
        }

        .testimonials-badge-star {
          width: 14px;
          height: 14px;
          fill: var(--color-primary);
          color: var(--color-primary);
        }

        .testimonials-heading {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: var(--color-text);
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .testimonials-subtitle {
          max-width: 480px;
          color: var(--color-text-secondary);
          font-size: clamp(0.95rem, 1.3vw, 1.08rem);
          line-height: 1.8;
        }

        .testimonials-dots {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 0.75rem;
        }

        .testimonials-dot {
          height: 10px;
          width: 10px;
          border-radius: var(--radius-full);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--color-border);
        }

        .testimonials-dot.active {
          width: 40px;
          background: var(--color-primary);
        }

        /* Right side */
        .testimonials-right {
          position: relative;
          min-height: 380px;
        }

        .testimonial-card-wrapper {
          position: absolute;
          inset: 0;
        }

        .testimonial-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-xl);
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .testimonial-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 1.25rem;
        }

        .testimonial-star {
          width: 20px;
          height: 20px;
          fill: #f59e0b;
          color: #f59e0b;
        }

        .testimonial-quote-wrapper {
          position: relative;
          flex: 1;
          margin-bottom: 1.25rem;
        }

        .testimonial-quote-icon {
          position: absolute;
          top: -6px;
          left: -6px;
          width: 32px;
          height: 32px;
          color: var(--color-primary-100);
          transform: rotate(180deg);
        }

        .testimonial-content {
          position: relative;
          z-index: 1;
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1.7;
          color: var(--color-text);
        }

        .testimonial-separator {
          margin: 1rem 0;
          background: var(--color-border);
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .testimonial-avatar {
          width: 48px;
          height: 48px;
          border: 2px solid var(--color-primary-100);
        }

        .testimonial-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-text);
        }

        .testimonial-role {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .testimonial-swipe-hint {
          display: none;
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.8rem;
          padding-top: 1rem;
          letter-spacing: 0.05em;
        }

        .testimonial-decor-1 {
          position: absolute;
          bottom: -16px;
          left: -16px;
          width: 80px;
          height: 80px;
          border-radius: var(--radius-xl);
          background: var(--color-primary-50);
          z-index: 0;
        }

        .testimonial-decor-2 {
          position: absolute;
          top: -16px;
          right: -16px;
          width: 80px;
          height: 80px;
          border-radius: var(--radius-xl);
          background: var(--color-primary-50);
          z-index: 0;
        }

        @media (max-width: 868px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .testimonials-left {
            text-align: center;
            align-items: center;
          }

          .testimonials-left-inner {
            align-items: center;
          }

          .testimonials-subtitle {
            text-align: center;
          }

          .testimonials-dots {
            justify-content: center;
          }

          .testimonial-swipe-hint {
            display: block;
            position: absolute;
            bottom: -30px;
            left: 0;
            right: 0;
          }

          .testimonials-right {
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 540px) {
          .testimonials-section {
            padding: 3rem 0;
          }

          .testimonial-card {
            padding: 1.5rem;
          }

          .testimonial-content {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
};

export { TestimonialsSection };
