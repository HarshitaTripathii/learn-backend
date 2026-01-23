import express from "express";
import authRouter from "./routers/authRouter";
import { Cookie } from "bun";
import cookieParser from "cookie-parser";
import tweetRouter from "./routers/tweetRouter";
import productRouter from "./routers/productRouter";
import urlRouter from "./routers/urlRouter";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Working",
  });
});

app.use("/auth", authRouter);
app.use("/tweet", tweetRouter);
app.use("/nykaa", productRouter);
app.use("/url", urlRouter);

export default app;
