import { Router } from "express";
import { createProduct, getProductById, getProductByCategory, deleteProduct } from "../Controllers/product.controller.js";

const router = Router()

router.route("/createProduct").post( createProduct )
router.route("/Product:id").post( getProductById )
router.route("/CategoryProducts:id").post( getProductByCategory )
router.route("/deleteProducts:id").post( deleteProduct )

export default router