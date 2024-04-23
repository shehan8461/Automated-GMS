import { useEffect, useState } from 'react'
import axios from "axios"

function DiscountDashboard(){
    const [countlist,setcountlist]=useState([]);
    const [customerlist,setcustomerlist]=useState([]);


//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8080/count_discount")
   const { count } = data.data;
   setcountlist(count);//get count
   setcustomerlist(data.data.data);//get table data
 
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])





    
return(
    <div>
  <h3>Total Discount Items:</h3>
            {countlist !== null ? (
                <p>Total Discount Items: {countlist}
               
              
                </p>
                
            ) : (
                <p>Loading...
                     </p>
          
               
            )}

<h3> Discount Items :</h3>
 

    

                  
                         <table>
                            <tr>
                            <th>Item</th>
                            <th>Discount Rate</th>
                            <th>Discount Price</th>
                            </tr>
<tbody>
    {
customerlist.map((e)=>{
                return(
                            <tr>
                                <td>
                                {e.item} 
                                </td>
                                <td>
                                {e.dis+"%"}
                                </td>
                                <td>

                                {+e.prize-(e.dis/100)*e.prize}

                                </td>
                            
 
                            </tr>
                )
                              })
}
                            </tbody>
                        </table>
                        
            
              

                     
                    
                
                
          
           

    </div>
)




}
export default DiscountDashboard;