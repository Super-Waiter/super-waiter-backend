import { NextFunction, Request, Response } from "express";
import firebaseAdmin from "../firebase";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

interface ExtendedRequest extends Request {
  user?: DecodedIdToken;
}

// Middleware function to protect routes
const protectRoute = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorization.split("Bearer ")[1];

    // Verify Firebase ID token
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    console.log(`token: ${decodedToken}`);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default protectRoute;
