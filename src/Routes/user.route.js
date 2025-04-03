import { Router} from "express";
import { registerUser, loginUser, getUserProfile, getAllUsers  } from "../Controllers/user.controller.js";

const router = Router()

router.route("/registerUser").post( registerUser )
router.route("/loginUser").post( loginUser )
router.route("/UserProfile").post( getUserProfile )
router.route("/allUsers").post( getAllUsers )

export default router