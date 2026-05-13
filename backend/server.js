require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = process.env.PORT || 3001;

// ---------------------
// Middleware
// ---------------------
app.use(cors({ origin: true }));
app.use(express.json());

// ---------------------
// Configure SendGrid
// ---------------------
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ---------------------
// Emoji map for display
// ---------------------
const emojiMap = {
  5: "😍 Love it!",
  4: "😊 Great",
  3: "🙂 It's okay",
  2: "😐 Meh",
  1: "😕 Needs work",
};

// ---------------------
// Health check
// ---------------------
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ---------------------
// POST /api/feedback
// ---------------------
app.post("/api/feedback", async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    // Validate
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating. Must be 1-5." });
    }

    const ratingLabel = emojiMap[rating] || `${rating}/5`;
    const feedbackText = feedback?.trim() || "No additional comments";
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Build a nice HTML email
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; background: #FAFAF8; border-radius: 16px; overflow: hidden; border: 1px solid #E5E5E0;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2D7D6F, #3A9B8A); padding: 28px 32px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 22px; font-weight: 700;">
            ✨ New Website Feedback
          </h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
            Houston Therapy Website
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 32px;">
          
          <!-- Rating -->
          <div style="background: white; border: 1px solid #E5E5E0; border-radius: 12px; padding: 20px; margin-bottom: 16px; text-align: center;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #8A8A9A; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">
              Overall Rating
            </p>
            <p style="margin: 0; font-size: 28px;">
              ${ratingLabel}
            </p>
          </div>

          <!-- Feedback -->
          <div style="background: white; border: 1px solid #E5E5E0; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #8A8A9A; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">
              Comments
            </p>
            <p style="margin: 0; font-size: 15px; color: #1A1A2E; line-height: 1.6;">
              ${feedbackText}
            </p>
          </div>

          <!-- Timestamp -->
          <p style="margin: 0; font-size: 12px; color: #8A8A9A; text-align: center;">
            Received on ${timestamp} (CST)
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background: #F3F1ED; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #8A8A9A;">
            Houston Therapy &middot; www.houston-therapy.com
          </p>
        </div>
      </div>
    `;

    const msg = {
      to: process.env.FEEDBACK_TO_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `${ratingLabel} — Website Feedback`,
      text: `Rating: ${ratingLabel}\nComments: ${feedbackText}\nReceived: ${timestamp}`,
      html: htmlContent,
    };

    await sgMail.send(msg);

    console.log(`✅ Feedback email sent — Rating: ${ratingLabel}`);
    res.json({ success: true, message: "Feedback received! Thank you." });
  } catch (error) {
    console.error("❌ SendGrid error:", error?.response?.body || error.message);
    res.status(500).json({
      error: "Failed to send feedback. Please try again later.",
    });
  }
});

// ---------------------
// Start server
// ---------------------
app.listen(PORT, () => {
  console.log(`\n🌿 Houston Therapy API running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Feedback endpoint: POST http://localhost:${PORT}/api/feedback\n`);
});
