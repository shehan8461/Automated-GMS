const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const MarketingFeedbackRoutes = require("./routes/MarketingFeedbackRoutes");
const MarketingDiscountRoutes = require("./routes/MarketingDiscuntRoutes");
const SupplerRoutes = require("./routes/SupplierRotes");
const Supplier_orderRoutes = require("./routes/supplier_orderRoutes");
const stockRouter = require("./routes/stockRouter.js");

const app=express()

app.use(cors())
app.use(express.json())
app.use("/", MarketingFeedbackRoutes);
app.use("/", MarketingDiscountRoutes);
app.use("/", SupplerRoutes);
app.use("/", Supplier_orderRoutes);
app.use("/stock", stockRouter);


const PORT=process.env.PORT||8060



mongoose.connect("mongodb+srv://seylincompany:seylin123@cluster0.zgjpnzd.mongodb.net/Garment_MGR?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})