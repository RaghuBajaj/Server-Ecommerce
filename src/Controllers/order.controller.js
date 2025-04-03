import { asyncHandler } from "../Utils/asyncHandler";
import { ApiError } from "../Utils/ApiError";
import { ApiResponce } from "../Utils/ApiResponce";
import { Order } from "../Models/order.model";

const createOrder = asyncHandler( async( req, res ) => {
    const { userId, products, totalPrice } = req.body;

    if ([ userId, products, totalPrice ].some(field => field.trim() == "")) {
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

    return res.status(200).json(
        new ApiResponce(201, createdOrder, "Order created successfully!")
    )
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

const cancelOrder = asyncHandler( async( req, res ) => {
    const { orderId } = req.body;

    if( !orderId ){
        throw new ApiError(401, "orderId is required!")
    }

    const isCancled = await Order.findByIdAndDelete({ orderId })

    if( !isCancled ){
        throw new ApiError(501, "Some error occured while deleting the order!")
    }

    return res.status(200).json(
        new ApiResponce(201, isCancled, "Order deleted successfully!")
    )
});

export { createOrder, getOrderById, getOrderByUser, getAllOrders, cancelOrder }