"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logoImage from "../assets/logo.png";

const navLinks = [
  { label: "Home", href: "#" },
  {
    label: "Therapists",
    href: "#therapists",
    children: [
      { label: "Daniel Katz, Psy.D", href: "#" },
      { label: "Shea McTaggart, Psy.D", href: "#" },
      { label: "Claire Cooper, LCSW", href: "#" },
      { label: "Dana Boyko, LCSW", href: "#" },
      { label: "Kelly Birkhold, LCSW", href: "#" },
      { label: "Catherine Comiskey, LCSW", href: "#" },
      { label: "Emma Barr, LPA", href: "#" },
    ],
  },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Individual Therapy", href: "#" },
      { label: "Couples Counseling", href: "#" },
      { label: "Family Therapy", href: "#" },
      { label: "Psychological Assessment", href: "#" },
      { label: "Teen Counseling", href: "#" },
      { label: "Career Counseling", href: "#" },
    ],
  },
  {
    label: "Specializations",
    href: "#specializations",
    children: [
      { label: "Anxiety", href: "#" },
      { label: "Depression", href: "#" },
      { label: "Trauma & PTSD", href: "#" },
      { label: "ADHD", href: "#" },
      { label: "EMDR", href: "#" },
      { label: "LGBTQ+", href: "#" },
    ],
  },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "#blog" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="navbar" id="main-nav">
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#" className="navbar-logo" id="navbar-logo">
          <img src={logoImage} alt="Houston Therapy Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">Houston Therapy</span>
        </a>

        {/* Desktop Nav */}
        <div className="navbar-links" id="desktop-nav">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="navbar-link-group"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href={link.href} className="navbar-link" id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                {link.label}
                {link.children && <ChevronDown size={14} />}
              </a>

              {/* Dropdown */}
              <AnimatePresence>
                {link.children && activeDropdown === link.label && (
                  <motion.div
                    className="navbar-dropdown"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.children.map((child) => (
                      <a key={child.label} href={child.href} className="navbar-dropdown-item">
                        {child.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="navbar-actions">
          <a href="tel:713-936-2561" className="navbar-phone" id="navbar-phone">
            <Phone size={16} />
            713-936-2561
          </a>
          <a href="#schedule" className="btn-primary navbar-cta" id="navbar-schedule">
            Schedule
          </a>
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-menu"
          >
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="navbar-mobile-link" onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#schedule" className="btn-primary" style={{ marginTop: "0.5rem", justifyContent: "center" }}>
              Schedule a Session
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(250, 250, 248, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--color-border);
          width: 100%;
        }

        .navbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--color-text);
          font-family: var(--font-heading);
        }

        .navbar-logo-img {
          height: 40px;
          width: auto;
          object-fit: contain;
        }

        .navbar-logo-text {
          color: var(--color-text);
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .navbar-link-group {
          position: relative;
        }

        .navbar-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .navbar-link:hover {
          color: var(--color-primary);
          background: var(--color-primary-50);
        }

        .navbar-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 8px;
          min-width: 220px;
          box-shadow: var(--shadow-lg);
          z-index: 200;
        }

        .navbar-dropdown-item {
          display: block;
          padding: 8px 14px;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .navbar-dropdown-item:hover {
          background: var(--color-primary-50);
          color: var(--color-primary);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .navbar-phone {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .navbar-phone:hover {
          color: var(--color-primary-dark);
        }

        .navbar-cta {
          padding: 8px 20px;
          font-size: 0.85rem;
        }

        .navbar-mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text);
          padding: 4px;
        }

        .navbar-mobile {
          overflow: hidden;
          padding: var(--space-md) var(--space-xl);
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .navbar-mobile-link {
          padding: 12px 16px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .navbar-mobile-link:hover {
          background: var(--color-primary-50);
          color: var(--color-primary);
        }

        @media (max-width: 1100px) {
          .navbar-links {
            display: none;
          }

          .navbar-phone {
            display: none;
          }

          .navbar-cta {
            display: none;
          }

          .navbar-mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}
