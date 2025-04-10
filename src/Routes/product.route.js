import { Router } from "express";
import { createProduct, getProductById, getProductByCategory, updateProduct, deleteProduct } from "../Controllers/product.controller.js";

const router = Router()

router.route("/createProduct").post( createProduct )
router.route("/:productId").get( getProductById )
router.route("/categoryProducts").get( getProductByCategory )
router.route("/delete/:productId").delete( deleteProduct )
router.route("/update/:productId").put( updateProduct )

export default router