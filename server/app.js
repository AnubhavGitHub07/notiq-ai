import express from "express";
import cors from "cors";
import router from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import passport from "./config/passport.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
app.set("trust proxy", 1);
app.use(passport.initialize());

const sanitizeOrigin = (url) => url ? url.replace(/\/$/, "") : url;

const allowedOrigins = [
    sanitizeOrigin(process.env.CLIENT_URL),
    "https://notiqai.vercel.app",
    "https://notiq-ai-beta.vercel.app",
    "http://localhost:5173"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        const sanitizedOrigin = sanitizeOrigin(origin);
        const isAllowed = allowedOrigins.includes(sanitizedOrigin) ||
            sanitizedOrigin.endsWith(".vercel.app");

        if (isAllowed) {
            // Reflect the EXACT origin from the request to avoid mismatch
            return callback(null, true);
        } else {
            console.error(`CORS Blocked for origin: ${origin}`);
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.get("/ping", (req, res) => {
    res.status(200).json({
        message: "pong",
        origin: req.headers.origin,
        allowedOrigins
    });
});


app.use(express.json());
app.use("/api/ai", aiRoutes);

app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/auth", router);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.status(200).send("NotiqAI Backend is running 🚀");
});

app.use(errorHandler);

app.get("/health", (req, res) => { // Health Check API
    res.status(200).json({
        message: "Server is running"
    });
});

export default app; // Exporting the app