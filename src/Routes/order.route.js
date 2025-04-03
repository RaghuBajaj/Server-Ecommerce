import { Router } from "express";
import { createOrder, getOrderById, getOrderByUser, getAllOrders, cancelOrder } from "../Controllers/order.controller.js";

const router = Router()

router.route("/createOrder").post( createOrder )
router.route("/AllOrders").post( getAllOrders )
router.route("/Order:id").post( getOrderById )
router.route("/Order:user").post( getOrderByUser )
router.route("/Order:user").post( getOrderByUser )
router.route("/cancelOrder:id").post( cancelOrder )

export default router