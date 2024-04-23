const express=require("express")


const discountmodel = require("../models/MarketingDiscountModels");

const router = express.Router();

router.get("/discount_read",async(req,res)=>{
    const data= await discountmodel.find({})
  
    res.json({success:true,data:data})
})

//discount create
router.post("/create_discount",async(req,res)=>{
    const data=new discountmodel(req.body)
    await data.save()
    res.send({success:true,message:"discount added successfuly"})
})

//discount update
router.put("/update_discount",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await discountmodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})


//discount delete
router.delete("/delete_discount/:id",async(req,res)=>{
const id=req.params.id
const data=await discountmodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})


//discount updated
router.get("/discount/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const discount = await discountmodel.findById(id);

        if (!discount) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

//get count in discount table
router.get("/count_discount",async(req,res)=>{
    try{
        const users=await discountmodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"discount count successfully",data:data})
    }

})
module.exports = router;