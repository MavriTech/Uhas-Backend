const express = require("express");
const adminRouter = require("./src/routers/admin_router")


const app = express();


//MIDDLEWARE
app.use("/admin",adminRouter);



app.listen(3000,()=>{
    console.log("Server has started running on port 3000");
})