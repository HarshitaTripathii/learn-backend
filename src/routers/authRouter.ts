import { Router } from "express";
import { hello, signUp } from "../controllers/authController";
import protect from "../middlewares/protect";

const authRouter = Router();

authRouter.get("/", protect, hello);
authRouter.post("/sign-up", signUp);

export default authRouter;
