import { Router} from "express";
import { registerUser, loginUser, getUserProfile, getAllUsers, updateUserProfile, changePassword } from "../Controllers/user.controller.js";

const router = Router()

router.route("/registerUser").post( registerUser )
router.route("/loginUser").post( loginUser )
router.route("/profile/:userId").get( getUserProfile )
router.route("/users").get( getAllUsers )
router.route("/update/:userId").post( updateUserProfile )
router.route("/changePassword/:userId").post( changePassword )

export default router