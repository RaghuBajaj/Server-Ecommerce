import { Router } from "express";
import { createOrder, getOrderById, getOrderByUser, getAllOrders, cancelOrder, orderStatus } from "../Controllers/order.controller.js";

const router = Router()

router.route("/createOrder").post( createOrder )
router.route("/allorders").get( getAllOrders )
router.route("/:orderId").get( getOrderById )
router.route("/user/:userId").get( getOrderByUser )
router.route("/:orderId").delete( cancelOrder )
router.route("/:orderId/status").patch( orderStatus )

export default router