import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import cache from "../lib/nodeCache";

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
  const cacheKey = "products:getAll";
  const cachedProduct = cache.get(cacheKey);
  if (cachedProduct) {
    console.log("cache hit");
    return res.json({
      success: true,
      data: cachedProduct,
    });
  }
  const products = await prisma.product.findMany();
  cache.set(cacheKey, products);
  console.log("cache miss");
  return res.json({
    success: true,
    data: products,
  });
}

async function getProductById(req: Request, res: Response) {
  //   const { content } = req.body;
  const prodId = req.params.id;
  const cacheKey = `product:get:${prodId}`;
  const cachedProduct = cache.get(cacheKey);
  if (cachedProduct) {
    return res.json({
      success: true,
      data: cachedProduct,
    });
  }
  const products = await prisma.product.findMany({
    where: {
      id: prodId as string,
    },
  });
  cache.set(cacheKey, products);
  return res.json({
    success: true,
    data: products,
  });
}

async function updateProduct(req: Request, res: Response) {
  // get the id from params
  const prodId = req.params.id;
  //   const { userId }: { userId: string } = (req as any).user;
  const cacheKey = `product:get:${prodId}`;
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
  cache.del("products:getAll");
  cache.del(cacheKey);
  return res.json({
    success: true,
    data: product,
  });
}

async function deleteProduct(req: Request, res: Response) {
  // get the id from params
  const prodId = req.params.id;
  //   const { userId }: { userId: string } = (req as any).user;
  const cacheKey = `product:get:${prodId}`;
  await prisma.product.delete({
    where: {
      id: prodId as string,
    },
  });

  const products = await prisma.tweet.findMany();
  cache.del("products:getAll");
  cache.del(cacheKey);
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
