import { asyncHandler } from "../Utils/asyncHandler";
import { ApiError } from "../Utils/ApiError";
import { ApiResponse } from "../Utils/ApiResponse";
import { Order } from "../Models/order.model";

const createOrder = asyncHandler( async( req, res ) => {
    const { userId } = req.params;
    const { products, totalPrice } = req.body;

    if ( !userId || !products || !products.length || !totalPrice ) {
        throw new ApiError(401, "All fields are not provided!")
    }

    const newOrder = await Order.create({
        userId,
        products,
        totalPrice 
    })

    const createdOrder = await Order.findById( newOrder._id )

    if( !createdOrder ){
        throw new ApiError(501, "Some error occured while creating the Order!")
    }

    return res.status(201).json(
        new ApiResponse(201, createdOrder, "Order created successfully!")
    )
});

const getOrderById = asyncHandler( async( req, res ) => {
    const { orderId } = req.params;

    if( !orderId ){
        throw new ApiError(401, "orderId is not provided!")
    }

    const existedOrder = await Order.findById( orderId )

    if( !existedOrder ){
        throw new ApiError(402, "Order not found!")
    }

    return res.status(200).json(
        new ApiResponse(200, existedOrder, "Order sent successfully!")
    )
});

const getOrderByUser = asyncHandler( async( req, res ) => {
    const { userId } = req.params;

    if( !userId ){
        throw new ApiError(401, "UserId is required!")
    }

    const userOrders = await Order.find({ userId })

    if( !userOrders.length ){
        throw new ApiError(402, "No order found!")
    }

    return res.status(200).json(
        new ApiResponse(200, userOrders, "Orders sent successfully!")
    )
});

const getAllOrders = asyncHandler( async( req, res ) => {
    const existedOrders = await Order.find();
    
    if( !existedOrders ){
        throw new ApiError(401, "No Order found!")
    }

    return res.status(200).json(
        new ApiResponse(200, existedOrders, "Orders sent successfully!")
    )
});

const cancelOrder = asyncHandler( async( req, res ) => {
    const { orderId } = req.param;

    if( !orderId ){
        throw new ApiError(401, "orderId is required!")
    }

    const isCancled = await Order.findByIdAndDelete( orderId )

    if( !isCancled ){
        throw new ApiError(501, "Some error occured while deleting the order!")
    }

    return res.status(200).json(
        new ApiResponse(200, isCancled, "Order deleted successfully!")
    )
});

const updateOrder = asyncHandler( async( req, res) => {})
const orderStatus = asyncHandler( async( req, res) => {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;

    const validStatuses = ["pending", "shipped", "delivered", "cancelled"]; 

    if(!orderId || !deliveryStatus){
        throw new ApiError(400, "Order Id and delivery status are required!")
    }

    if(!validStatuses.includes(deliveryStatus)){
        throw new ApiError(400, "Invalid status value!")
    }

    const updatedStatus = await Order.findByIdAndUpdate(
        orderId,
        { deliveryStatus },
        { new: true }
    ) 

    if( !updatedStatus ){
        throw new ApiError(400, "Order not found!")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedStatus, "Order status updated successfully!")
    ) 
})

export { createOrder, getOrderById, getOrderByUser, getAllOrders, cancelOrder, orderStatus }