import express from "express";
import authRouter from "./routers/authRouter";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Working",
  });
});

app.use("/auth", authRouter);

export default app;
