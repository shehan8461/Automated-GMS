const express=require("express");

const supplierModel = require("../models/SupplierModel")

const router = express.Router();

router.post("/create_supplier",async(req,res)=>{
    const data=new supplierModel(req.body);
    await data.save();
    res.send({success:true,message:"user added"})
})

router.get("/supplier",async(req,res)=>{
    const data=await supplierModel.find({})
    res.json({success:true,message:"",data:data})
})

router.put("/update_supplier",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await supplierModel.updateOne({_id:id},rest)
    res.json({success:true,message:"updates successfully",data:data})


})

router.delete("/delete_supplier/:id",async(req,res)=>{
    const id=req.params.id
    const data=await supplierModel.deleteOne({_id:id})
    res.json({success:true,messsage:"user deleted"})
})

router.get("/user_supplier/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await supplierModel.findById(id);

        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});


//sending message to email
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

router.use(bodyParser.json());

// Define your endpoint for sending emails
router.post('/send-email-supplier', async (req, res) => {
  try {
    const { email } = req.body;

   console.log(email+"==========================");

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ruwanyahettiarachchi@gmail.com',
        pass: 'ltzn jamh brzq tkap'
      }
    });

    // Send a thank you email
    await transporter.sendMail({
      from: 'ruwanyahettiarachchi@gmail.com',
      to: email,
      subject: 'Thank You for connecting with Selyn!',
      text: 'Dear supplier, You have been added as an supplier to our system.'
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//get count in suppliers table
router.get("/count_supplier",async(req,res)=>{
    try{
        const suppliers=await supplierModel.find({});

        return res.status(200).json({
            count:suppliers.length,
            data:suppliers
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"count successfully",data:data})
    }

})

module.exports = router;