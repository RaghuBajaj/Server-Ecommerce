import { Router } from "express";
import { createCategory, getAllCategories, deleteCategory } from "../Controllers/category.controller.js";

const router = Router()

router.route("/createCategory").post( createCategory )
router.route("/allCategories").post( getAllCategories )
router.route("/delete:Category").post( deleteCategory )

export default router 