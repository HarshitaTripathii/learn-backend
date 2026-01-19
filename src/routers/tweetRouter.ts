import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  updateTweet,
} from "../controllers/tweetController";
import protect from "../middlewares/protect";

const tweetRouter = Router();

tweetRouter.post("/create", protect, createTweet);
tweetRouter.get("/", getAllTweet);
tweetRouter.put("/:id", updateTweet);
tweetRouter.delete("/:id", deleteTweet);

export default tweetRouter;
