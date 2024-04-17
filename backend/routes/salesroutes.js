const express=require("express");

const cateringmodel = require("../models/salesmodel")

const router = express.Router();
router.get("/_sales",async(req,res)=>{
    const data= await cateringmodel.find({})
  
    res.json({success:true,data:data})
})


router.post("/create_sales",async(req,res)=>{
    const data=new cateringmodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


router.put("/update_sales",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await cateringmodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




router.delete("/delete_sales/:id",async(req,res)=>{
const id=req.params.id
const data=await cateringmodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})





router.get("/user_sales/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const discount = await cateringmodel.findById(id);

        if (!discount) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
router.get("/count_sales",async(req,res)=>{
    try{
        const users=await cateringmodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"distributor count successfully",data:data})
    }

})

module.exports = router;