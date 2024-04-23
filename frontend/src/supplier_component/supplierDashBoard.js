import { useEffect, useState } from 'react'
import axios from "axios"

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
        <h1>Total Suppliers:</h1>
            {countlist !== null ? (
                <p>Total suppliers: {countlist}</p>
                
            ) : (
                <p>Loading...
                     </p>  
            )}

<h2> Supplier / Company Name :</h2>
 {   
            supplierlist.map((e)=>{
                return(
               
                    <p> {e.name}</p>                
                )
            })
           }
    </div>
)

}
export default SupplierDashBoard