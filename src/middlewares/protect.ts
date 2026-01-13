import type { Request, Response, NextFunction } from "express";

function protect(req: Request, res: Response, next: NextFunction) {
  const loggedIn = process.env.LOGGED_IN === "true";

  if (loggedIn) {
    return res.json({
      success: false,
      message: "are you fool",
    });
  }

  next();
}

export default protect;
