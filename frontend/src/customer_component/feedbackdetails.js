import  { useEffect, useState } from 'react'
import axios from "axios"
import './userdetails.css'


function FeedbackDetails(){
const [datalist,setdatalist]=useState([]);
const [searchkey,setsearchkey]=useState('');

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8080/feedback_read")
    console.log(data.data.success)
    if(data.data.success){
        setdatalist(data.data.data)
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
    const data=await axios.delete("http://localhost:8080/delete_feedback/"+id)
    if(data.data.success){
        getfetchdata()
        console.log(data.data.message)
        alert("Deleted User Successfully!")
    }
}

//search
const handlesearch = (e) => {

    filterdata(searchkey);
}
const filterdata = (searchKey) => {
    const filteredData = datalist.filter(customer =>
        customer.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setdatalist(filteredData);
}


return(
    <div className="userdetails">
<div className='searchbtn'>
        <input  type="search" onChange={(e)=>setsearchkey(e.target.value)} placeholder='search' className='in'/><br></br>
        <button  id='search-btn'  onClick={(e)=>handlesearch(e)}> search </button>
        </div>   
            <table>
              
                        <tr>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Last purchase date</th>
                        <th>Last purchase Item</th>
                        <th>Feedback Type </th>
                        <th>Discription</th>
                        <th>Choose Option</th>
                        
                        </tr>


                        <tbody>
                            { 
                               datalist.map((e1)=>{
                                return(
                                    <tr> 
                                      <td> {e1.name}</td> 
                                      <td> {e1.email}</td> 
                                      <td> {e1.L_date}</td> 
                                      <td> {e1.L_type}</td>
                                      <td> {e1.F_type}</td>
                                      <td> {e1.F_discription}</td>
                                     
                                      <td>
                                        
                                        <button onClick={()=>handledelete(e1._id)}>delete</button>
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
export default FeedbackDetails;
