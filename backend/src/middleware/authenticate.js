import { User } from "../models/index.js";
import { AppError } from "../utils/errors.js";
import { verifyAccess } from "../utils/crypto.js";
import { USER_STATUS } from "../utils/constants.js";

export async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    const bearer = header?.startsWith("Bearer ") ? header.slice(7) : null;
    const token = bearer || req.cookies?.mc_access;
    if (!token) throw new AppError("Authentication required.", 401, "UNAUTHENTICATED");
    let decoded;
    try {
      decoded = verifyAccess(token);
    } catch {
      throw new AppError("Your session has expired. Please sign in again.", 401, "SESSION_EXPIRED");
    }
    const user = await User.findById(decoded.sub);
    if (!user) throw new AppError("Authentication required.", 401, "UNAUTHENTICATED");
    if (user.status === USER_STATUS.SUSPENDED || user.status === USER_STATUS.DEACTIVATED) {
      throw new AppError("This account is not permitted to continue.", 403, "ACCOUNT_DISABLED");
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  const bearer = header?.startsWith("Bearer ") ? header.slice(7) : null;
  const token = bearer || req.cookies?.mc_access;
  if (!token) return next();
  authenticate(req, res, next);
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) return next(new AppError("Authentication required.", 401, "UNAUTHENTICATED"));
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not authorised to perform this action.", 403, "FORBIDDEN"));
    }
    next();
  };
}
