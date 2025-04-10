import express from "express";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use( express.json({ limit: "16kb" }) )
app.use( express.urlencoded({ extended: true, limit: "16kb" }) )
app.use( express.static("public") )
app.use( express.static("uploads") )

import userRouter from "./Routes/user.route.js";
import productRouter from "./Routes/product.route.js";
import orderRouter from "./Routes/order.route.js";
import categoryRouter from "./Routes/category.route.js";
 
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/category", categoryRouter)

export { app }