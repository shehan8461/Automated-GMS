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
        <div className='dashboard'>
            <div id="cstomer-dashboard">
              <body className='background-marketing'>
                <div id="feedback-contain">
                  <h1>Total Feedbacks:</h1>
            {countlist !== null ? (
                <p>Total Feedback: {countlist}
               
              
                </p>
                
            ) : (
                <p>Loading...
                     </p>
          
               
            )}

<h2> Customer Feedbacks :</h2>
 {

    
            userlist.map((e)=>{
                return(
               
                    <p> {e.F_discription}</p>

                    
                    
                
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