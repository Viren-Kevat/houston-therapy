import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Heart, Users, Brain } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import aboutOffice from "@/assets/about-office.png";
import aboutSession from "@/assets/about-session.png";
import aboutTeam from "@/assets/about-team.png";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface AboutSectionProps {
  badge?: string;
  heading?: string;
  description?: React.ReactNode;
  tabs?: Tab[];
}

const AboutSection = ({
  badge = "About Houston Therapy",
  heading = "Therapy Tailored to How You Think, Feel, and Live",
  description = (
    <>
      Founded by <span className="gradient-text">Daniel Katz, Psy.D.</span>, Houston Therapy helps people live more meaningful and satisfying lives through integrative, personalized therapy.
    </>
  ),
  tabs = [
    {
      value: "tab-1",
      icon: <Heart className="h-auto w-4 shrink-0" />,
      label: "Our Approach",
      content: {
        badge: "Integrative Therapy",
        title: "A personalized path to lasting change.",
        description:
          "We take an integrative approach that considers your experiences, health, and environment to understand the full picture. Through personalized, structured therapy, you gain insight, shift patterns, and create lasting change — not just temporary relief.",
        buttonText: "Schedule a Session",
        imageSrc: aboutOffice,
        imageAlt:
          "Modern therapy office at Houston Therapy with comfortable seating and calming decor",
      },
    },
    {
      value: "tab-2",
      icon: <Users className="h-auto w-4 shrink-0" />,
      label: "Our Team",
      content: {
        badge: "12+ Expert Clinicians",
        title: "Highly skilled psychologists, therapists & counselors.",
        description:
          "Our diverse team of licensed psychologists, clinical social workers, and professional counselors specialize in anxiety, ADHD, trauma, couples therapy, and more. Each clinician brings unique expertise to provide the right fit for every client.",
        buttonText: "Meet Our Team",
        imageSrc: aboutTeam,
        imageAlt:
          "Team of therapists and psychologists at Houston Therapy practice",
      },
    },
    {
      value: "tab-3",
      icon: <Brain className="h-auto w-4 shrink-0" />,
      label: "Specializations",
      content: {
        badge: "18+ Specialties",
        title: "Evidence-based treatment for what matters most.",
        description:
          "From anxiety and depression to ADHD, trauma, PTSD, couples counseling, and neuropsychological assessment — we offer comprehensive mental health services using modalities like EMDR, Brainspotting, CBT, DBT, and Ketamine Assisted Psychotherapy.",
        buttonText: "View All Services",
        imageSrc: aboutSession,
        imageAlt:
          "Therapist and client during a counseling session at Houston Therapy",
      },
    },
  ],
}: AboutSectionProps) => {
  return (
    <section className="about-section" id="about-section">
      <div className="about-container">
        <div className="about-header">
          <Badge variant="outline" className="about-badge">
            {badge}
          </Badge>
          <h2 className="about-heading">{heading}</h2>
          <p className="about-description">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="about-tabs">
          <TabsList className="about-tabs-list">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="about-tab-trigger"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="about-tabs-content-wrapper">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="about-tab-content"
              >
                <div className="about-tab-text">
                  <Badge variant="outline" className="about-content-badge">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="about-tab-title">{tab.content.title}</h3>
                  <p className="about-tab-description">
                    {tab.content.description}
                  </p>
                  <Button className="about-tab-button" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <div className="about-tab-image-wrapper">
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="about-tab-image"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>

      <style>{`
        .about-section {
          padding: 5rem 0;
          background-color: var(--color-bg);
          font-family: var(--font-sans);
        }

        .about-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        .about-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .about-badge {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-primary);
          border-color: var(--color-primary-100);
          background: var(--color-primary-50);
          padding: 6px 18px;
        }

        .about-heading {
          max-width: 680px;
          font-size: clamp(1.7rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: var(--color-text);
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .about-description {
          color: var(--color-text-secondary);
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          max-width: 600px;
          line-height: 1.7;
        }

        /* === Tabs List === */
        .about-tabs {
          margin-top: 2rem;
        }

        .about-tabs-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .about-tab-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: var(--radius-xl);
          font-size: 0.9rem;
          font-weight: 600;
          font-family: var(--font-sans);
          color: var(--color-text-muted);
          background: transparent;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .about-tab-trigger:hover {
          color: var(--color-primary);
          background: var(--color-primary-50);
        }

        .about-tab-trigger[data-state="active"] {
          color: var(--color-primary);
          background: var(--color-primary-50);
          border-color: var(--color-primary-100);
          box-shadow: var(--shadow-sm);
        }

        .about-tab-trigger svg {
          color: var(--color-primary);
        }

        /* === Tab Content === */
        .about-tabs-content-wrapper {
          margin-top: 2rem;
          background: var(--color-bg-alt);
          border-radius: var(--radius-xl);
          padding: clamp(1.5rem, 4vw, 4rem);
          border: 1px solid var(--color-border);
        }

        .about-tab-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .about-tab-content[data-state="inactive"] {
          display: none;
        }

        .about-tab-text {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .about-content-badge {
          width: fit-content;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: var(--font-sans);
          color: var(--color-primary-dark);
          border-color: var(--color-primary-100);
          background: var(--color-surface);
          padding: 5px 14px;
        }

        .about-tab-title {
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          font-weight: 700;
          color: var(--color-text);
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .about-tab-description {
          color: var(--color-text-secondary);
          font-size: clamp(0.95rem, 1.2vw, 1.08rem);
          line-height: 1.8;
        }

        .about-tab-button {
          width: fit-content;
          margin-top: 0.5rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          font-family: var(--font-sans);
          border: none;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-base);
          box-shadow: 0 4px 15px rgba(45, 125, 111, 0.3);
          letter-spacing: 0.01em;
        }

        .about-tab-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(45, 125, 111, 0.4);
        }

        .about-tab-button:active {
          transform: translateY(0);
        }

        /* === Image === */
        .about-tab-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .about-tab-image {
          width: 100%;
          max-height: 420px;
          object-fit: cover;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }

        /* === Responsive === */
        @media (max-width: 868px) {
          .about-tab-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .about-tab-text {
            text-align: center;
            align-items: center;
          }

          .about-tab-image {
            max-height: 320px;
          }
        }

        @media (max-width: 540px) {
          .about-section {
            padding: 3rem 0;
          }

          .about-tabs-list {
            flex-direction: column;
            gap: 0.5rem;
          }

          .about-tab-trigger {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export { AboutSection };
