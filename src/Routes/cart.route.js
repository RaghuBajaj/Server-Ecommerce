import { Router } from "express";
import { addToCart, removeFromCart, deleteItemFromCart, getCartByUserId, getAllCart } from "../Controllers/cart.controller";

const router = Router();

router.route("/addToCart").post( addToCart );
router.route("/removeFromCart").put( removeFromCart );
router.route("/deleteItemFromCart").put( deleteItemFromCart );
router.route("/getUserCart").get( getCartByUserId );
router.route("/getAllCart").get( getAllCart );

export default router;