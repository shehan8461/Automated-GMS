import { useEffect, useState } from 'react'
import axios from "axios"
import './supplierDashboard.css'


function SupplierDashBoard(){
    const [countlist, setcountlist]=useState([]);
    const [supplierlist, setsupplierlist]=useState([]);

//read
const getfetchdata=async()=>{
    try{
        const data=await axios.get("http://localhost:8080/count_supplier")
        const { count } = data.data;
        setcountlist(count);//get count
        setsupplierlist(data.data.data);//get table data
    }catch(err){
        alert(err)
    }
}
useEffect(()=>{
    getfetchdata()
},[])

return(
    <div>
        <body className='supplier_background'>

            <div className="box">
       
            {countlist !== null ? (
                <p id="cnt">Total suppliers: {countlist}</p>
                
            ) : (
                <p>Loading...
                     </p>  
            )}
</div>
<table id="supplierdashtable">
                            <tr>
                            <th>Supplier Name</th>
                            <th>Product</th>
                            <th>Unit Price</th>
                            </tr>
<tbody>
    {
supplierlist.map((e)=>{
                return(
                            <tr>
                                <td>
                                {e.name} 
                                </td>
                                <td>
                                {e.product}
                                </td>
                                <td>

                                {e.unitPrice}

                                </td>
                            
 
                            </tr>
                )
                              })
}
                            </tbody>
                        </table>
           </body>
    </div>
)

}
export default SupplierDashBoard