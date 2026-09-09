import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = {
  node: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  corsOrigins: String(process.env.CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mediconnect_ai",
  aiApiUrl: process.env.AI_API_URL || "",
  aiApiKey: process.env.AI_API_KEY || "",
  mapsApiKey: process.env.MAPS_API_KEY || "",
  voiceApiUrl: process.env.VOICE_API_URL || "",
  voiceApiKey: process.env.VOICE_API_KEY || "",
  // Python triage/risk microservice (D:\curser\ai-model). Kept separate from
  // aiApiUrl above, which mobileAi.service.js already uses for the chat
  // navigator's LLM call - they are different services with different auth.
  ai: {
    baseUrl: String(process.env.AI_TRIAGE_API_URL || "").replace(/\/+$/, ""),
    serviceKey: process.env.AI_TRIAGE_API_KEY || "",
    timeoutMs: Number(process.env.AI_TRIAGE_TIMEOUT_MS || 15000),
    voiceTimeoutMs: Number(process.env.AI_VOICE_TIMEOUT_MS || 60000),
    cacheTtlSeconds: Number(process.env.AI_TRIAGE_CACHE_TTL || 300),
    maxQueued: Number(process.env.AI_QUEUE_MAX || 500),
    maxVoiceBytes: Number(process.env.AI_VOICE_MAX_BYTES || 10 * 1024 * 1024),
    // Lets the scheduled re-scoring job call this backend without a user JWT.
    cronKey: process.env.AI_CRON_KEY || "",
  },
  redis: {
    url: process.env.REDIS_URL || "",
    connectTimeoutMs: Number(process.env.REDIS_CONNECT_TIMEOUT_MS || 2000),
  },
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "dev-access-secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret",
  jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES || "15m",
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES || "7d",
  inviteHours: Number(process.env.INVITE_TOKEN_EXPIRES_HOURS || 72),
  otpMinutes: Number(process.env.OTP_EXPIRES_MINUTES || 10),
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 12),
  appTz: process.env.APP_TZ || "Asia/Kolkata",
  medicineExpiryWarningDays: Number(process.env.MEDICINE_EXPIRY_WARNING_DAYS || 30),
  email: {
    host: process.env.EMAIL_HOST || "",
    port: Number(process.env.EMAIL_PORT || 587),
    user: process.env.EMAIL_USER || "",
    password: process.env.EMAIL_PASSWORD || "",
    from: process.env.EMAIL_FROM || "MediConnect AI <noreply@mediconnect.ai>",
  },
};
