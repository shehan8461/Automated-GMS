import { useEffect, useState } from 'react'
import axios from "axios"
import './dashboard.css'


function UserDashBoard(){
    const [countlist,setcountlist]=useState([]);
    const [userlist,setuserlist]=useState([]);
    
  

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8080/count_feedback")
   const { count } = data.data;
   setcountlist(count);//get count
   setuserlist(data.data.data);//get table data
 
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])









    return(
        <div className='cstomer-dashboard'>
            <div id="cstomer-dashboard">
              <body className='background-marketing'>
                <div id="feedback-contain">
         
            {countlist !== null ? (
                <p> <b>Total Feedback:</b> <b>{countlist}</b><br></br>
               
              
                </p>
                
            ) : (
                <p>Loading...
                     </p>
          
               
            )}
<br></br>
<h2> <b>Customer Feedbacks :</b></h2><br></br>
 {

    
            userlist.map((e)=>{
                return(
               
                    <p> <b>{e.F_description}</b></p>

                    
                    
                
                )
            })
           }
</div>
</body>
</div>
        </div>
    )
}
export default UserDashBoard