import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function protect(
  req: Request  ,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.myJwtCookie;
  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorised",
    });
  }
  const JWT_SECRET = process.env.JWT_SECRET || "";
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    (req as any).user = payload;
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "expired / invalid token",
    });
  }
}

export default protect;
