import { Router } from "express";
import { hello } from "../controllers/authController";
import protect from "../middlewares/protect";

const authRouter = Router();

authRouter.get("/", protect, hello);

export default authRouter;
