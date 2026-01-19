import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  updateTweet,
} from "../controllers/tweetController";

const tweetRouter = Router();

tweetRouter.post("/create", createTweet);
tweetRouter.get("/", getAllTweet);
tweetRouter.put("/:id", updateTweet);
tweetRouter.delete("/:id", deleteTweet);

export default tweetRouter;
