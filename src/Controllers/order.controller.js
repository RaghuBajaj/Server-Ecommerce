import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Order } from "../Models/order.model.js";

const createOrder = asyncHandler(async(req, res) => {
    const { userId } = req.params;
    const { products, totalPrice } = req.body;

    if ( !userId?.trim() || !products || !products.length || !totalPrice ) {
        throw new ApiError(400, "All fields are not provided!")
    }

    const newOrder = await Order.create({
        userId,
        products,
        totalPrice 
    })

    const createdOrder = await Order.findById( newOrder._id ).lean()
    if( !createdOrder ){
        throw new ApiError(500, "Some error occured while creating the Order!")
    }

    return res.status(201).json(
        new ApiResponse(201, createdOrder, "Order created successfully!")
    )
});

const getOrderById = asyncHandler(async(req, res) => {
    const { orderId } = req.params;

    if( !orderId?.trim() ){
        throw new ApiError(400, "Order Id is required!")
    }

    const existedOrder = await Order.findById( orderId ).lean()
    if( !existedOrder ){
        throw new ApiError(404, "Order not found!")
    }

    return res.status(200).json(
        new ApiResponse(200, existedOrder, "Order fetched successfully!")
    )
});

const getOrderByUser = asyncHandler(async(req, res) => {
    const { userId } = req.params;

    if( !userId?.trim() ){
        throw new ApiError(400, "UserId is required!")
    }

    const userOrders = await Order.find({ userId }).lean()
    if( !userOrders.length ){
        throw new ApiError(404, "No order found!")
    }

    return res.status(200).json(
        new ApiResponse(200, userOrders, "Orders sent successfully!")
    )
});

const getAllOrders = asyncHandler(async(req, res) => {
    const existedOrders = await Order.find();
    
    if( !existedOrders ){
        throw new ApiError(404, "No Order found!")
    }

    return res.status(200).json(
        new ApiResponse(200, existedOrders, "Orders sent successfully!")
    )
});

const cancelOrder = asyncHandler(async(req, res) => {

    const { orderId } = req.param;
    if( !orderId?.trim() ){
        throw new ApiError(400, "orderId is required!")
    }

    const isCancled = await Order.findByIdAndDelete( orderId )
    if( !isCancled ){
        throw new ApiError(500, "Some error occured while deleting the order!")
    }

    return res.status(200).json(
        new ApiResponse(200, isCancled, "Order deleted successfully!")
    )
});

const orderStatus = asyncHandler(async(req, res) => {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;
    
    const validStatuses = ["pending", "shipped", "delivered", "cancelled"]; 
    
    if(!orderId?.trim() || !deliveryStatus?.trim()){
        throw new ApiError(400, "Order Id and delivery status are required!")
    }
    
    if(!validStatuses.includes(deliveryStatus)){
        throw new ApiError(404, "Invalid status value!")
    }
    
    const updatedStatus = await Order.findByIdAndUpdate(
        orderId,
        { deliveryStatus },
        { new: true }
    ) 
    if( !updatedStatus ){
        throw new ApiError(404, "Order not found!")
    }
    
    return res.status(200).json(
        new ApiResponse(200, updatedStatus, "Order status updated successfully!")
    ) 
});
const updateOrder = asyncHandler(async(req, res) => {});

export { createOrder, getOrderById, getOrderByUser, getAllOrders, cancelOrder, orderStatus }