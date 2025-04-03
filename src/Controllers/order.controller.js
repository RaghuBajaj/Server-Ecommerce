import { asyncHandler } from "../Utils/asyncHandler";
import { ApiError } from "../Utils/ApiError";
import { ApiResponce } from "../Utils/ApiResponce";
import { Order } from "../Models/order.model";

const createOrder = asyncHandler( async( req, res ) => {
    const {} = req.body;
});

const getOrderById = asyncHandler( async( req, res ) => {
    const { orderId } = req.body;

    if( !orderId ){
        throw new ApiError(401, "orderId is not provided!")
    }

    const existedOrder = await Order.findOne({ orderId })

    if( !existedOrder ){
        throw new ApiError(402, "Order not found!")
    }

    return res.status(200).json(
        new ApiResponce(201, existedOrder, "Order sent successfully!")
    )
});

const getOrderByUser = asyncHandler( async( req, res ) => {
    const { userId } = req.body;

    if( !userId ){
        throw new ApiError(401, "UserId is required!")
    }

    const userOrders = await Order.find({ userId })

    if( !userOrders ){
        throw new ApiError(402, "No order found!")
    }

    return res.status(200).json(
        new ApiResponce(201, "Orders sent successfully!")
    )
});

const getAllOrders = asyncHandler( async( req, res ) => {
    const existedOrders = await Order.find();
    
    if( !existedOrders ){
        throw new ApiError(401, "No Order found!")
    }

    return res.status(200).json(
        new ApiResponce(201, existedOrders, "Orders sent successfully!")
    )
});

const cancelOrder = asyncHandler( async( req, res ) => {})

export { getOrderById, getOrderByUser, getAllOrders }