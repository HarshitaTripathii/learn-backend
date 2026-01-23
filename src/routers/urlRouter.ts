import { Router } from "express";
import { createUrl, getShortLink } from "../controllers/urlController";

const urlRouter = Router();

urlRouter.post("/create", createUrl);
urlRouter.get("/:id", getShortLink);

export default urlRouter;
