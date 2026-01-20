import type { Request, Response } from "express";
import prisma from "../lib/prisma";

async function createProduct(req: Request, res: Response) {
  const { name, price, stock } = req.body;
  await prisma.product.create({
    data: {
      name,
      price,
      stock,
    },
  });
  return res.json({
    success: true,
    message: "product created successfully",
  });
}

async function getAllProducts(req: Request, res: Response) {
  //   const { content } = req.body;
  const products = await prisma.product.findMany();
  return res.json({
    success: true,
    data: products,
  });
}

async function getProductById(req: Request, res: Response) {
  //   const { content } = req.body;
  const prodId = req.params.id;
  const products = await prisma.product.findMany({
    where: {
      id: prodId as string,
    },
  });
  return res.json({
    success: true,
    data: products,
  });
}

async function updateProduct(req: Request, res: Response) {
  // get the id from params
  const prodId = req.params.id;
  //   const { userId }: { userId: string } = (req as any).user;

  // get the new product from the body
  const { name, price, stock } = req.body;
  if (!name || !price || !stock) {
    return res.json({
      success: false,
      message: "Enter full product detail",
    });
  }

  const product = await prisma.product.update({
    where: {
      id: prodId as string,
    },
    data: {
      name,
      price,
      stock,
    },
  });

  return res.json({
    success: true,
    data: product,
  });
}

async function deleteProduct(req: Request, res: Response) {
  // get the id from params
  const prodId = req.params.id;
  //   const { userId }: { userId: string } = (req as any).user;
  await prisma.product.delete({
    where: {
      id: prodId as string,
    },
  });

  const products = await prisma.tweet.findMany();
  return res.json({
    success: true,
    data: products,
  });
}
export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
