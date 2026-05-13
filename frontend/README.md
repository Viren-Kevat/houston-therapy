# Houston Therapy — Modern React Frontend

> **Houston Therapy** is Houston's home for mental health. We provide therapy, counseling, and mental health services from highly skilled psychologists, therapists, and counselors in Houston, Texas.

**Live Site:** [www.houston-therapy.com](https://www.houston-therapy.com)

---

## 📋 Table of Contents

- [About the Practice](#about-the-practice)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Components](#components)
- [Services Offered](#services-offered)
- [Specializations](#specializations)
- [Clinicians](#clinicians)
- [Contact Information](#contact-information)
- [Design System](#design-system)
- [SEO](#seo)

---

## 🏥 About the Practice

**Houston Therapy** is a group therapy practice located in Houston, Texas, founded by **Daniel Katz, Psy.D.** The practice's mission is to help people live more meaningful and satisfying lives through integrative, personalized therapy.

**Tagline:** *"Therapy tailored to how you think, feel, and live."*

**Approach:** Integrative therapy that takes into account experiences, health, and environment to understand the full picture. Through personalized, structured therapy, clients gain insight, shift patterns, and create lasting change.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling (via `@tailwindcss/vite`) |
| **Framer Motion** | Animations & micro-interactions |
| **Lucide React** | Icon library |
| **clsx + tailwind-merge** | Conditional class merging (`cn()` utility) |

### shadcn/UI Compatibility

This project follows the **shadcn/UI project structure**:
- Components in `src/components/ui/`
- Utility function `cn()` in `src/lib/utils.ts`
- Path aliases: `@/*` → `./src/*`

---

## 📁 Project Structure

```
frontend/
├── index.html                  # Entry HTML with SEO meta tags & Google Fonts
├── vite.config.ts             # Vite config with Tailwind & path aliases
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json          # App-specific TS config with @/ path aliases
├── package.json               # Dependencies & scripts
├── public/                    # Static assets
└── src/
    ├── main.tsx               # React entry point
    ├── App.tsx                # Root component (assembles all sections)
    ├── index.css              # Design system, tokens, animations, Tailwind
    ├── assets/
    │   └── hero-therapy.png   # Hero banner image
    ├── lib/
    │   └── utils.ts           # cn() utility (clsx + tailwind-merge)
    └── components/
        ├── navbar.tsx         # Sticky glassmorphism navbar with dropdowns
        ├── hero-banner.tsx    # Split-screen hero (content left, image right)
        ├── services-section.tsx # Services grid with animated cards
        ├── footer.tsx         # Full footer with CTA band & 4-column grid
        └── ui/
            └── aurora-background.tsx  # Aurora gradient background effect
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173/`

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧩 Components

### Aurora Background (`components/ui/aurora-background.tsx`)

An animated gradient background effect from the Aceternity UI library, adapted for shadcn compatibility.

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | required | Content rendered above the aurora |
| `showRadialGradient` | `boolean` | `true` | Toggle radial gradient mask |
| `className` | `string` | — | Additional CSS classes |

**Usage:**
```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";

<AuroraBackground showRadialGradient={true}>
  <h1>Your content here</h1>
</AuroraBackground>
```

### Hero Banner (`components/hero-banner.tsx`)

Split-screen hero section:
- **Left side:** Badge, heading with gradient text, description, specialty tags, CTA buttons (Schedule + Call), trust indicators
- **Right side:** Therapy office image with floating glassmorphism card

Features:
- Framer Motion staggered entrance animations
- Responsive layout (stacks on mobile)
- Interactive specialty tags with hover effects
- Floating animated card overlay

### Navbar (`components/navbar.tsx`)

Sticky navigation with:
- Glassmorphism background blur
- Dropdown menus for Therapists, Services, Specializations
- Phone number & Schedule CTA
- Responsive mobile hamburger menu with AnimatePresence

### Services Section (`components/services-section.tsx`)

8-card grid showcasing therapy services:
- Staggered reveal animations on scroll
- Icon + title + tagline + description
- Hover lift effect with shadow enhancement
- Responsive grid (auto-fill columns)

### Footer (`components/footer.tsx`)

Full-width footer with:
- Green gradient CTA band ("A More Meaningful Life Awaits")
- 4-column layout: Brand/Contact, Services, Specializations, Quick Links
- Contact details, hours, address
- Copyright bar

---

## 🩺 Services Offered

| Service | Description |
|---|---|
| **Individual Therapy** | Personalized one-on-one therapy for deeper self-understanding |
| **Couples Counseling** | Build trust, improve communication, strengthen relationships |
| **Family Therapy** | Improve family communication, resolve conflicts |
| **Psychological Assessment** | ADHD, autism, learning disabilities, mood disorders, diagnostic clarification |
| **Neuropsychological Assessment** | Comprehensive brain-behavior evaluations |
| **Teen Counseling** | Navigate anxiety, identity, peer pressure in a safe environment |
| **Child Therapy** | Age-appropriate therapeutic interventions |
| **Group Therapy** | Improve interpersonal relationships and social skills |
| **Career Counseling** | Goal identification, career transitions, professional coaching |
| **Executive Coaching** | Leadership development and professional performance |
| **Ketamine Assisted Psychotherapy** | Innovative trauma and mood treatment |
| **Decisional Capacity** | Assessment of decision-making abilities |
| **Supervision & Professional Consultation** | For mental health professionals |

---

## 🎯 Specializations

### Core Areas
- **Anxiety & Stress** — Panic, chronic stress, worry management
- **Depression** — Mood disorders, energy, daily functioning
- **Trauma & PTSD** — Evidence-based trauma processing
- **ADHD** — Executive functioning, attention, organization
- **Couples & Relationships** — Communication, trust, conflict resolution

### Treatment Modalities
- **EMDR** — Eye Movement Desensitization and Reprocessing
- **Brainspotting** — Brain-body trauma processing
- **CBT-I** — Cognitive Behavioral Therapy for Insomnia
- **DBT** — Dialectical Behavioral Therapy
- **Mindfulness** — Present-moment awareness practices

### Population-Specific
- **LGBTQ+ Counseling** — Affirming, inclusive therapy
- **College Students & Young Adults** — Transition, identity, academic stress
- **Professionals** — Burnout, work stress, work-life balance
- **Creatives & Artists** — Narrative therapy and creative processing

### Additional Areas
- Grief and Loss
- Substance Abuse and Addiction
- Panic Attacks
- Life Transitions
- Personality Disorders
- Self-esteem and Self-confidence
- Bipolar Disorder
- Abuse and Neglect
- Self-harm
- Stress Management
- Cultural Oppression and Discrimination

---

## 👨‍⚕️ Clinicians

| Name | Credentials | Role / Specialties |
|---|---|---|
| **Daniel Katz, Psy.D.** | Psychologist | Founder of Houston Therapy; integrative approach |
| **Shea McTaggart, Psy.D** | Neuropsychologist | Director of Assessment; brain-based interventions |
| **Daniel DeBrule, Ph.D.** | Clinical Psychologist | Men's mental health, STEM/legal/medical professionals |
| **Kristina Nunez, Psy.D.** | Licensed Psychologist | Eating disorders, anxiety, family therapy |
| **Claire Cooper, LCSW** | Licensed Clinical Social Worker | Attachment theory, DBT, CBT, EFT |
| **Dana Boyko, LCSW** | Licensed Clinical Social Worker | Anxiety, depression, grief, trauma, LGBTQ+ |
| **Kelly Birkhold, LCSW** | Licensed Clinical Social Worker | Dual master's in SW & MFT; 10+ years experience |
| **Catherine Comiskey, LCSW** | Licensed Clinical Social Worker | Medical professionals, shame, personality disorders |
| **Elizabeth Seabolt-Esparza, LPC** | Licensed Professional Counselor | EMDR, DBT, trauma |
| **Emma Barr, LPA** | Licensed Psychological Associate | CBT, ACT, neurofeedback |
| **Joe Bartolotta, MBA, LMSW** | Licensed Master Social Worker | Corporate stress, work-life balance |
| **Brianna Dennis-McCrory, LPC-A** | Licensed Professional Counselor Associate | CBT, PCIT, anxiety/OCD, bipolar |

---

## 📞 Contact Information

| Detail | Value |
|---|---|
| **Address** | 4646 Wild Indigo St #150, Houston, TX 77027 |
| **Phone** | 713-936-2561 |
| **Fax** | 713-489-1159 |
| **Email** | Info@Houston-Therapy.com |
| **Website** | [www.houston-therapy.com](https://www.houston-therapy.com) |
| **Hours** | Monday - Friday, 8:00 AM - 9:00 PM |
| **Scheduling** | By Appointment Only |
| **Online Portal** | [Schedule Online](https://drdskatz.clientsecure.me) |
| **Insurance** | Does not accept insurance; provides out-of-network documentation |

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#2D7D6F` | Primary brand teal/sage |
| `--color-primary-light` | `#3A9B8A` | Hover states, gradients |
| `--color-accent` | `#C9A94E` | Warm gold accent |
| `--color-bg` | `#FAFAF8` | Page background |
| `--color-text` | `#1A1A2E` | Primary text |

### Typography

- **Headings:** Mulish (Google Fonts)
- **Body:** Mulish (Google Fonts)
- Weights: 400, 500, 600, 700, 800

### Animations

- Aurora background: 60s infinite linear gradient
- Fade-in-up/left/right on scroll
- Float animation for decorative elements
- Hover lift effects on cards
- Pulse effect on status indicators

---

## 🔍 SEO

- Proper `<title>` and `<meta description>` tags
- Open Graph (`og:`) tags for social sharing
- Semantic HTML5 structure
- Single `<h1>` per page
- All interactive elements have unique `id` attributes
- Google Fonts loaded with `preconnect` for performance
- Responsive `viewport` meta tag

---

## 📝 License

Private project for Houston Therapy practice.
