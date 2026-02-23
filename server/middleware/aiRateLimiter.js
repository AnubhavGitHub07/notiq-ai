import rateLimit from "express-rate-limit";

const aiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // max requests per hour
  message: {
    message: "AI limit reached. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default aiRateLimiter;