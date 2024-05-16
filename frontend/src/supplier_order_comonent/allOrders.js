import {useState,useEffect } from 'react'
import axios  from 'axios'
import "./allOrders.css";


function AllOrders(){
const [orderlist,setorderlist]=useState([]);

const [searchbtn, setSearchBtn]=useState('');








//read
const getfetchdetails=async()=>{
    try{
        const data=await axios.get("http://localhost:8080/order_supplier")
        console.log(data.data.success)
        if(data.data.success){
            setorderlist(data.data.data)
        }
    }catch(err){
        console.log(err)
    }
}
useEffect(()=>{
getfetchdetails()
},[])

//delete
const handledelete=async(id)=>{
    const data=await axios.delete("http://localhost:8080/delete_order_supplier/"+id)
    if(data.data.success){
        getfetchdetails()
        console.log(data.data.message)
        alert("order deleted successfully")
    }
}

//Search Button
const generateSearch = (e)=>{
    getData(searchbtn)
}

const getData = (searchbtn)=>{
    const getdata = orderlist.filter(order=> 
        order.product.toLowerCase().includes(searchbtn.toLowerCase())
        );
        setorderlist(getdata);
}


    return(
<div>
    <body className='supplier_background'>
        <div className="container">
            <input
              id="srchinput"
              type="search"
              onChange={(e)=>setSearchBtn(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
            
          
            <button onClick={(e)=>generateSearch(e)} className="srchbtn" type="submit">
              Search
              
            </button>
            </div>

<table className='supplier_table'>
              
                        <tr>
                        <th>Supplier Name</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Edit Order</th>
                        <th>Delete</th>
                        </tr>


                        <tbody>
                            { 
                               orderlist.map((e1)=>{
                                return(
                                    <tr> 
                                      <td> {e1.name}</td>  
                                      <td> {e1.product}</td> 
                                      <td> {e1.quantity}</td>
                                      <td> {e1.date}</td>
                                      <td>
                                        <a href={`/updateorder/${e1._id}`} className='btn1'>Edit</a>
                                     </td>
                                     <td>
                                        <button onClick={()=>handledelete(e1._id)}>Delete</button>
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
export default AllOrders