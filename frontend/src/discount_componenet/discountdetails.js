import  { useEffect, useState ,useRef} from 'react'
import axios from "axios"
import './discountdetails.css'
import {useReactToPrint} from "react-to-print";

function DiscountDetails(){
    const componentPDF=useRef();
    const [showdiscounts,setshowdiscounts]=useState([]);

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8080/discount_read")
    console.log(data.data.success)
    if(data.data.success){
        setshowdiscounts(data.data.data)
    }
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])

//delete
const handledelete= async(id)=>{
    const data=await axios.delete("http://localhost:8080/delete_discount/"+id)
    if(data.data.success){
        getfetchdata()
        console.log(data.data.message)
        alert("Discount item deleted Successfully!")
    }
}
//generatePDF
const generatePDF=useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"showdiscounts",
    onAfterPrint:()=>alert("data save in pdf")
})
    return(
        <div className="showdiscount">
               <body className='background-marketing'>
            <div ref={componentPDF} style={{width:'100%'}}>
 <table>
              
              <tr>
              <th>Item  Name</th>
              <th>Item Price</th>
              <th>Discount</th>
              <th>Choose Option</th>
             
              
              </tr>


              <tbody>
                  { 
                     showdiscounts.map((e1)=>{
                      return(
                          <tr> 
                            <td> {e1.item}</td> 
                            <td> {e1.prize}</td> 
                            <td> {e1.prize-(e1.dis/100)*e1.prize}</td> 
                         
                           
                            <td>
                              <a href={`/update_discount/${e1._id}`}>Edit Discount</a>
                              <button onClick={()=>handledelete(e1._id)}>Delete Item</button>
                            </td>
                          </tr>
                      )

              })
                  }
              </tbody>
  </table>
  </div>
  <button id="btnreport" onClick={generatePDF}>Download Report</button>
  </body>
        </div>
    )
}
export default DiscountDetails;