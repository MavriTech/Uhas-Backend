const express = require("express");
const adminRouter = require("./src/routers/admin_router");
const PORT = process.env.PORT || 3000;


const app = express();


//MIDDLEWARE
app.use("/admin",adminRouter);



app.listen(PORT,()=>{
    console.log("Server has started running on port 3000");
})