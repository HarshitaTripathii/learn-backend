import type {Request, Response} from "express";

function hello(req: Request, res: Response) {
  return res.json({
    success: true,
    message: "Auth Router Working",
  });
}
export {hello}