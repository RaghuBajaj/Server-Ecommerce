import express from "express";
import userRouter from "./Routes/user.route.js";
import productRouter from "./Routes/product.route.js";
import orderRouter from "./Routes/order.route.js";
import categoryRouter from "./Routes/category.route.js";

const app = express()
 
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/category", categoryRouter)

export { app }