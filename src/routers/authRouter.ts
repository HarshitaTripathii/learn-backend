import { Router } from "express";
import { hello, signUp, logIn } from "../controllers/authController";
import protect from "../middlewares/protect";

const authRouter = Router();

authRouter.get("/", protect,hello);
authRouter.post("/sign-up", signUp);
authRouter.post("/log-in", logIn);

export default authRouter;
