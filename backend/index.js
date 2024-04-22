require("dotenv").config();//added by Himansa
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const MarketingFeedbackRoutes = require("./routes/MarketingFeedbackRoutes");
const MarketingDiscountRoutes = require("./routes/MarketingDiscuntRoutes");
const SupplerRoutes = require("./routes/SupplierRotes");
const Supplier_orderRoutes = require("./routes/supplier_orderRoutes");
const stockRouter = require("./routes/stockRouter.js");
const SalesRoutes = require("./routes/salesroutes.js");
const transportsRoute = require("./routes/transportsRoute.js");
const vehiclesRoute = require("./routes/vehiclesRoute.js");
//HR import statements begins
const authRoutes_HR = require("./routes/authRoutes_HR");
const userRoutes_HR = require("./routes/userRoutes_HR");
const evaluationRoutes = require("./routes/evaluationRoutes_HR");
const payrollRoutes = require("./routes/payrollRoutes_HR");
const trainingRoutes = require("./routes/trainingRoutes_HR");//HR import statements end
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app=express()

app.use(cors())
app.use(express.json())

app.use("/auth/orders", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);



//HR DEpartment----------------------

// --------------------Automatic Payroll_Generation

// Import the cron job function
const generatePayroll = require("./util_HR/scheduled_tasks/cronJobs");
// Call the function to schedule the tasks
generatePayroll();
//HR DEpartment ends----------------------




app.use("/", MarketingFeedbackRoutes);
app.use("/", MarketingDiscountRoutes);
app.use("/", SupplerRoutes);
app.use("/", Supplier_orderRoutes);
app.use("/stock", stockRouter);
app.use("/", SalesRoutes);
//HR routes 
app.use("/auth_HR", authRoutes_HR);
app.use("/api_HR/users", userRoutes_HR);
app.use("/api_HR/evaluations", evaluationRoutes);
app.use("/api_HR/payrolls", payrollRoutes);
app.use("/api_HR/trainings", trainingRoutes);
//Hr routes are over

app.use("/transports", transportsRoute); // Use '/transports' for transport routes
app.use("/vehicles", vehiclesRoute); // Use '/vehicles' for vehicle routes


const PORT=process.env.PORT||8060



mongoose.connect("mongodb+srv://seylincompany:seylin123@cluster0.zgjpnzd.mongodb.net/Garment_MGR?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})