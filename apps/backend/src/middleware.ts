import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_key";

export const middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  // Get the authorization header
  const authHeader = req.headers["authorization"];

  // Ensure the header exists and follows the "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  // Extract just the token part
  const token = authHeader.split(" ")[1] ?? "";

  try {
    // Verify the token using the ACCESS secret
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload;

    if (decoded && decoded.userId) {
      // Attach the userId to the request object for the next route to use
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ message: "Invalid token payload!" });
    }
  } catch (e) {
    // catch block is CRITICAL for the refresh flow.
    return res.status(401).json({
      message: "Token is expired or invalid!",
    });
  }
};