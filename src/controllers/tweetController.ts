import type { Request, Response } from "express";
import prisma from "../lib/prisma";

async function createTweet(req: Request, res: Response) {
  const { content } = req.body;
  //   const {userId}=req.user as {req:{user:{userId:string}}};
  //   const {userId}=(req as {user:{userId:string}} ).user ;
  const { userId }: { userId: string } = (req as any).user;
  await prisma.tweet.create({
    data: {
      content,
      userId,
    },
  });
  return res.json({
    success: true,
    message: "tweet posted",
  });
}

async function getUserTweets(req: Request, res: Response) {
  //   const { content } = req.body;
  const { userId }: { userId: string } = (req as any).user;
  const tweets = await prisma.tweet.findMany({
    where: {
      userId,
    },
  });
  return res.json({
    success: true,
    data: tweets,
  });
}

async function getAllTweet(req: Request, res: Response) {
  //   const { content } = req.body;
  const tweets = await prisma.tweet.findMany();
  return res.json({
    success: true,
    data: tweets,
  });
}

async function updateTweet(req: Request, res: Response) {
  // get the id from params
  const contId = req.params.id;

  // get the new content from the body
  const { newContent } = req.body;
  if (!newContent) {
    return res.json({
      success: false,
      message: "Enter content",
    });
  }

  await prisma.tweet.update({
    where: {
      id: contId as string,
    },
    data: {
      content: newContent,
    },
  });

  const tweets = await prisma.tweet.findMany();
  return res.json({
    success: true,
    data: tweets,
  });
}

async function deleteTweet(req: Request, res: Response) {
  // get the id from params
  const contId = req.params.id;
  await prisma.tweet.delete({
    where: {
      id: contId as string,
    },
  });

  const tweets = await prisma.tweet.findMany();
  return res.json({
    success: true,
    data: tweets,
  });
}

export { createTweet, getAllTweet, updateTweet, deleteTweet, getUserTweets};
