require("dotenv").config({path:"./env"})
import { app } from "./app";

app.listen(8000, (req, res)=>{
    res.send("app is listening at port 8000");
})