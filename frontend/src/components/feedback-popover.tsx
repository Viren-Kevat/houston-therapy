"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, Send, X, Sparkles } from "lucide-react";

const emojiOptions = [
  { emoji: "😍", label: "Love it!", value: 5 },
  { emoji: "😊", label: "Great", value: 4 },
  { emoji: "🙂", label: "It's okay", value: 3 },
  { emoji: "😐", label: "Meh", value: 2 },
  { emoji: "😕", label: "Needs work", value: 1 },
];

export function FeedbackPopover() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Show the button when user scrolls to the services section
  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById("services-section");
      if (!servicesSection) return;

      const rect = servicesSection.getBoundingClientRect();
      // Consider it in view if any part of the section is visible
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      setIsVisible(isInView);

      // Auto-close the open popover if we scroll out of view
      if (!isInView && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleSubmit = async () => {
    setIsSubmitted(true);

    // Send feedback to backend
    try {
      await fetch("https://houston-therapy.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: selectedEmoji, feedback }),
      });
    } catch (err) {
      console.warn("Feedback API unavailable, but still showing thank you:", err);
    }

    // Show thank-you for 2.2s, then close popover but keep trigger button visible
    setTimeout(() => {
      setIsOpen(false);
      // Reset form state so it's fresh if reopened
      setIsSubmitted(false);
      setSelectedEmoji(null);
      setFeedback("");
    }, 2200);
  };

  const handleDismiss = () => {
    // Just close the form, don't hide the trigger button permanently
    setIsOpen(false);
  };


  return (
    <AnimatePresence>
      {isVisible && (
        <div ref={popoverRef} className="feedback-wrapper" id="feedback-popover">
          {/* Floating trigger button */}
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                className="feedback-trigger"
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Give us feedback"
              >
                <motion.div
                  className="feedback-trigger-pulse"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <MessageCircleHeart size={22} />
                <span className="feedback-trigger-label">Heyyy!</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Popover form */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="feedback-card"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              >
                {/* Close button */}
                <button
                  className="feedback-close"
                  onClick={handleDismiss}
                  aria-label="Close feedback"
                >
                  <X size={16} />
                </button>

                {!isSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="feedback-header">
                      <motion.div
                        className="feedback-header-icon"
                        animate={{ rotate: [0, -10, 10, -5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <Sparkles size={18} />
                      </motion.div>
                      <h4 className="feedback-title">Quick Feedback ✨</h4>
                      <p className="feedback-subtitle">
                        How do you like our site so far?
                      </p>
                    </div>

                    {/* Emoji picker */}
                    <div className="feedback-emojis">
                      {emojiOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          className={`feedback-emoji ${selectedEmoji === option.value ? "selected" : ""}`}
                          onClick={() => setSelectedEmoji(option.value)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          animate={
                            selectedEmoji === option.value
                              ? { y: -4 }
                              : { y: 0 }
                          }
                        >
                          <span className="feedback-emoji-icon">
                            {option.emoji}
                          </span>
                          <span className="feedback-emoji-label">
                            {option.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Text area */}
                    <div className="feedback-textarea-wrapper">
                      <textarea
                        className="feedback-textarea"
                        placeholder="Any thoughts or suggestions? (optional)"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      className="feedback-submit"
                      onClick={handleSubmit}
                      disabled={selectedEmoji === null}
                      whileHover={
                        selectedEmoji !== null ? { scale: 1.02 } : {}
                      }
                      whileTap={selectedEmoji !== null ? { scale: 0.98 } : {}}
                    >
                      <Send size={15} />
                      Send Feedback
                    </motion.button>
                  </>
                ) : (
                  /* Thank you state */
                  <motion.div
                    className="feedback-thanks"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                  >
                    <motion.div
                      className="feedback-thanks-emoji"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      💚
                    </motion.div>
                    <h4 className="feedback-thanks-title">Thank you!</h4>
                    <p className="feedback-thanks-text">
                      Your feedback means the world to us 🌿
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <style>{`
            .feedback-wrapper {
              position: fixed;
              bottom: 28px;
              right: 28px;
              z-index: 90;
              font-family: var(--font-sans);
            }

            /* === Trigger Button === */
            .feedback-trigger {
              position: relative;
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 12px 20px;
              background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
              color: white;
              border: none;
              border-radius: var(--radius-full);
              cursor: pointer;
              font-family: var(--font-sans);
              font-size: 0.88rem;
              font-weight: 600;
              box-shadow: 0 6px 24px rgba(45, 125, 111, 0.35);
              letter-spacing: 0.01em;
            }

            .feedback-trigger:hover {
              box-shadow: 0 8px 30px rgba(45, 125, 111, 0.45);
            }

            .feedback-trigger-pulse {
              position: absolute;
              inset: 0;
              border-radius: var(--radius-full);
              background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
              z-index: -1;
            }

            .feedback-trigger-label {
              display: inline;
            }

            /* === Card === */
            .feedback-card {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 340px;
              background: var(--color-surface);
              border: 1px solid var(--color-border);
              border-radius: var(--radius-xl);
              padding: 1.5rem;
              box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(45, 125, 111, 0.05);
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            .feedback-close {
              position: absolute;
              top: 12px;
              right: 12px;
              background: none;
              border: none;
              cursor: pointer;
              color: var(--color-text-muted);
              padding: 4px;
              border-radius: 6px;
              transition: all var(--transition-fast);
            }

            .feedback-close:hover {
              color: var(--color-text);
              background: var(--color-bg-alt);
            }

            /* === Header === */
            .feedback-header {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 4px;
            }

            .feedback-header-icon {
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100));
              border-radius: 10px;
              color: var(--color-primary);
              margin-bottom: 4px;
            }

            .feedback-title {
              font-size: 1.05rem;
              font-weight: 700;
              color: var(--color-text);
              line-height: 1.3;
            }

            .feedback-subtitle {
              font-size: 0.85rem;
              color: var(--color-text-muted);
            }

            /* === Emoji Picker === */
            .feedback-emojis {
              display: flex;
              justify-content: center;
              gap: 6px;
            }

            .feedback-emoji {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
              padding: 8px 6px;
              background: transparent;
              border: 2px solid transparent;
              border-radius: var(--radius-md);
              cursor: pointer;
              transition: all var(--transition-fast);
            }

            .feedback-emoji:hover {
              background: var(--color-primary-50);
            }

            .feedback-emoji.selected {
              background: var(--color-primary-50);
              border-color: var(--color-primary);
            }

            .feedback-emoji-icon {
              font-size: 1.5rem;
              line-height: 1;
            }

            .feedback-emoji-label {
              font-size: 0.65rem;
              color: var(--color-text-muted);
              font-weight: 500;
              white-space: nowrap;
            }

            .feedback-emoji.selected .feedback-emoji-label {
              color: var(--color-primary);
              font-weight: 600;
            }

            /* === Textarea === */
            .feedback-textarea-wrapper {
              width: 100%;
            }

            .feedback-textarea {
              width: 100%;
              padding: 10px 12px;
              font-family: var(--font-sans);
              font-size: 0.88rem;
              border: 1.5px solid var(--color-border);
              border-radius: var(--radius-md);
              background: var(--color-bg);
              color: var(--color-text);
              resize: none;
              transition: border-color var(--transition-fast);
              line-height: 1.5;
            }

            .feedback-textarea:focus {
              outline: none;
              border-color: var(--color-primary);
              box-shadow: 0 0 0 3px rgba(45, 125, 111, 0.1);
            }

            .feedback-textarea::placeholder {
              color: var(--color-text-muted);
            }

            /* === Submit === */
            .feedback-submit {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              width: 100%;
              padding: 10px 16px;
              background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
              color: white;
              font-weight: 600;
              font-size: 0.9rem;
              font-family: var(--font-sans);
              border: none;
              border-radius: var(--radius-full);
              cursor: pointer;
              transition: all var(--transition-base);
              box-shadow: 0 3px 12px rgba(45, 125, 111, 0.25);
            }

            .feedback-submit:hover:not(:disabled) {
              box-shadow: 0 5px 18px rgba(45, 125, 111, 0.35);
            }

            .feedback-submit:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }

            /* === Thank You === */
            .feedback-thanks {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 8px;
              padding: 1.5rem 0;
            }

            .feedback-thanks-emoji {
              font-size: 2.5rem;
              line-height: 1;
            }

            .feedback-thanks-title {
              font-size: 1.15rem;
              font-weight: 700;
              color: var(--color-text);
            }

            .feedback-thanks-text {
              font-size: 0.88rem;
              color: var(--color-text-muted);
            }

            @media (max-width: 480px) {
              .feedback-wrapper {
                bottom: 16px;
                right: 16px;
              }

              .feedback-card {
                width: calc(100vw - 32px);
                right: 0;
              }

              .feedback-trigger-label {
                display: none;
              }

              .feedback-trigger {
                padding: 12px;
                border-radius: 50%;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
