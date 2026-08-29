import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function hashPassword(plain) {
  return bcrypt.hash(plain, env.bcryptRounds);
}

export function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

export function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}

export function signAccessToken(payload) {
  return jwt.sign(payload, env.jwtAccessSecret, { expiresIn: env.jwtAccessExpires });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpires });
}

export function verifyAccess(token) {
  return jwt.verify(token, env.jwtAccessSecret);
}

export function verifyRefresh(token) {
  return jwt.verify(token, env.jwtRefreshSecret);
}

export function cookieOptions(maxAgeMs) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProd,
    path: "/",
    maxAge: maxAgeMs,
  };
}
