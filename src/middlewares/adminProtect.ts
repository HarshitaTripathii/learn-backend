import type { Request, Response, NextFunction } from "express";
import type { role } from "../generated/prisma/enums";

function adminProtect(req: Request, res: Response, next: NextFunction) {
  const { role }: { role: role } = (req as any).user;
  try {
    if (role === "ADMIN") {
      next();
    } else throw Error;
  } catch (error) {
    return res.json({
      success: false,
      message: "invalid token",
    });
  }
}

export default adminProtect;
