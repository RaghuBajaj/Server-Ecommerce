import { Router } from "express";
import { createCategory, getAllCategories, deleteCategory } from "../Controllers/category.controller.js";

const router = Router()

router.route("/createCategory").post( createCategory )
router.route("/allCategories").get( getAllCategories )
router.route("/delete/Category").delete( deleteCategory )

export default router 