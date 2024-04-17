const express=require("express")


const usermodel = require("../models/MarketingFeedbackModels");

const router = express.Router();

router.get("/feedback_read",async(req,res)=>{
    const data= await usermodel.find({})
  
    res.json({success:true,data:data})
})

//feedback create
router.post("/create_feedback",async(req,res)=>{
    const data=new usermodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})




//feedback delete
router.delete("/delete_feedback/:id",async(req,res)=>{
const id=req.params.id
const data=await usermodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})



//get count in feedback table
router.get("/count_feedback",async(req,res)=>{
    try{
        const users=await usermodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"feedback count successfully",data:data})
    }

})

//sending message to email
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

router.use(bodyParser.json());

// Define your endpoint for sending emails
router.post('/send-email_feedback', async (req, res) => {
  try {
    const { email } = req.body;

   console.log(email+"==========================");

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shehansalitha1999@gmail.com',
        pass: 'zelr tlrf yfzo fltp'
      }
    });

    // Send a thank you email
    await transporter.sendMail({
      from: 'shehansalitha1999@gmail.com',
      to: email,
      subject: 'Thank You for Your valuable feedback!',
      text: 'Thank you for placing your order with us!'
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;