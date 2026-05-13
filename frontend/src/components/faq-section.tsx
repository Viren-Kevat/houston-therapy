"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import faqFirstSession from "@/assets/faq-first-session.png";
import faqInsurance from "@/assets/faq-insurance.png";
import faqTherapyTypes from "@/assets/faq-therapy-types.png";
import faqScheduling from "@/assets/faq-scheduling.png";
import faqConfidentiality from "@/assets/faq-confidentiality.png";

interface FaqItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    title: "What should I expect during my first session?",
    image: faqFirstSession,
    description:
      "Your first session at Houston Therapy is a getting-to-know-you conversation. Your therapist will ask about your background, what brought you in, and what you'd like to achieve. There's no pressure to share more than you're comfortable with. We'll discuss your goals, answer any questions, and outline a personalized treatment approach. Most clients find the first session both reassuring and eye-opening.",
  },
  {
    id: 2,
    title: "Do you accept insurance?",
    image: faqInsurance,
    description:
      "Houston Therapy does not accept insurance directly. However, we provide out-of-network documentation (superbills) that you can submit to your insurance for potential reimbursement. Many PPO plans offer out-of-network benefits that cover a significant portion of session costs. Our team can help you understand your coverage and navigate the reimbursement process.",
  },
  {
    id: 3,
    title: "What types of therapy do you offer?",
    image: faqTherapyTypes,
    description:
      "We offer a wide range of evidence-based therapies including Individual Therapy, Couples Counseling, Family Therapy, Teen Counseling, Psychological & Neuropsychological Assessment, and Ketamine Assisted Psychotherapy. Our therapists use modalities like EMDR, Brainspotting, CBT, DBT, ACT, and mindfulness-based approaches — tailored to each client's unique needs.",
  },
  {
    id: 4,
    title: "How do I schedule an appointment?",
    image: faqScheduling,
    description:
      "Scheduling is easy. You can book online through our patient portal at drdskatz.clientsecure.me, call us at 713-936-2561, or email Info@Houston-Therapy.com. We're available Monday through Friday, 8:00 AM to 9:00 PM. All appointments are by scheduling only — we'll work to find a time that fits your availability.",
  },
  {
    id: 5,
    title: "Is everything I share confidential?",
    image: faqConfidentiality,
    description:
      "Absolutely. Confidentiality is a cornerstone of the therapeutic relationship and is protected by law. What you share in therapy stays between you and your therapist. There are very limited legal exceptions (such as imminent danger to self or others), which your therapist will explain during your first session. We take your privacy extremely seriously.",
  },
];

const FaqSection = () => {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(faqData[0].image);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-badge">Frequently Asked Questions</span>
          <h2 className="faq-heading">
            Everything You Need to Know
          </h2>
          <p className="faq-description">
            Common questions about therapy at Houston Therapy — we're here to
            make the process as easy and transparent as possible.
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-accordion-side">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {faqData.map((item) => (
                <AccordionItem key={item.id} value={`item-${item.id}`}>
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(item.image);
                      setActiveTabId(item.id);
                    }}
                    className="faq-trigger"
                  >
                    <h6
                      className={`faq-trigger-title ${item.id === activeTabId ? "active" : ""}`}
                    >
                      {item.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="faq-answer">{item.description}</p>
                    <div className="faq-mobile-image">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="faq-image"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="faq-image-side">
            <img
              src={activeImage}
              alt="FAQ illustration"
              className="faq-image"
            />
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 5rem 0;
          background-color: var(--color-bg-alt);
          font-family: var(--font-sans);
        }

        .faq-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 18px;
          background: var(--color-primary-50);
          border: 1px solid var(--color-primary-100);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: 0.04em;
        }

        .faq-heading {
          font-size: clamp(1.7rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: var(--color-text);
          line-height: 1.2;
          max-width: 600px;
        }

        .faq-description {
          color: var(--color-text-secondary);
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          max-width: 560px;
          line-height: 1.7;
        }

        .faq-content {
          display: flex;
          gap: 3rem;
          align-items: flex-start;
        }

        .faq-accordion-side {
          flex: 1;
          min-width: 0;
        }

        .faq-image-side {
          flex: 1;
          display: block;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--color-bg-alt);
        }

        .faq-image-side .faq-image {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: var(--radius-lg);
          transition: opacity 0.3s ease;
        }

        .faq-trigger {
          cursor: pointer;
          padding: 1.25rem 0 !important;
          border: none;
          text-decoration: none !important;
        }

        .faq-trigger:hover {
          text-decoration: none !important;
        }

        .faq-trigger-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-muted);
          transition: color var(--transition-fast);
          text-align: left;
        }

        .faq-trigger-title.active {
          color: var(--color-text);
        }

        .faq-answer {
          color: var(--color-text-secondary);
          line-height: 1.8;
          font-size: 0.95rem;
          padding-top: 0.5rem;
        }

        .faq-mobile-image {
          display: none;
          margin-top: 1rem;
        }

        .faq-mobile-image .faq-image {
          width: 100%;
          max-height: 280px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        /* Accordion border styling */
        .faq-accordion-side [data-radix-collection-item] {
          border-color: var(--color-border);
        }

        /* Chevron color */
        .faq-trigger svg {
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .faq-image-side {
            display: none;
          }

          .faq-mobile-image {
            display: block;
          }

          .faq-section {
            padding: 3rem 0;
          }
        }
      `}</style>
    </section>
  );
};

export { FaqSection };
