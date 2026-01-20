import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productControllers";
import protect from "../middlewares/protect";
import adminProtect from "../middlewares/adminProtect";

const productRouter = Router();

productRouter.post("/create", protect, adminProtect, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", protect, adminProtect, updateProduct);
productRouter.delete("/:id", protect, adminProtect, deleteProduct);

export default productRouter;
