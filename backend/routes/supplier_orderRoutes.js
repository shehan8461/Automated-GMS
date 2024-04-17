const express=require("express");

const odermodel = require("../models/Supplier_orderModel")

const router = express.Router();

router.post("/create_order_supplier",async(req,res)=>{
    const data=new odermodel(req.body);
    await data.save();
    res.send({success:true,message:"order placed"})
})

router.get("/order_supplier",async(req,res)=>{
    const data=await odermodel.find({})
    res.json({success:true,message:"",data:data})
})
router.put("/updateorder_supplier",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await odermodel.updateOne({_id:id},rest)
    res.json({success:true,message:"order updated successfully",data:data})
})

router.delete("/delete_order_supplier/:id",async(req,res)=>{
    const id=req.params.id
    const data=await odermodel.deleteOne({_id:id})
    res.json({success:true,messsage:"order deleted"})
})



router.get("/order_supplier/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await odermodel.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;