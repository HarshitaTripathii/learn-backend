import type { Request, Response } from "express";
import prisma from "../lib/prisma";

async function createUrl(req: Request, res: Response) {
  const { link } = req.body;
  const url = await prisma.url.create({
    data: {
      link,
    },
  });
  return res.json({
    success: true,
    data: url.id,
  });
}

async function getShortLink(req: Request, res: Response) {
  const urlId = String(req.params.id);
  const url = await prisma.url.findFirst({
    where: {
      id: urlId,
    },
  });
  if (!url) {
    return res.json({
      success: false,
      message: "url not exists",
    });
  }
  return res.redirect(url.link);
}

export { createUrl, getShortLink };
