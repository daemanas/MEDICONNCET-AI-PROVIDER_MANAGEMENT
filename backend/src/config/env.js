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
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mediconnect_ai",
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
