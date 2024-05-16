import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './updateservice.css'

function UpdateService(){
    const { id } = useParams();
    const [updatediscount,setupdatediscount]=useState({
      p_id:"",
      name:"",
      price:"",
      quantity:"",
      total:""
        
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/user_sales/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdatediscount(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdatediscount({
          ...updatediscount,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:8080/update_sales`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updatediscount._id,
              ...updatediscount,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            console.log('service updated successfully');
           alert("updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(

      <div className="update-page">
        <div className='service-update'>


     <lable>Product id::</lable>
    <input type="text" id="p_id" name="p_id" onChange={handleInputChange} value={updatediscount?.p_id }/><br></br>
    <lable>Product Name:</lable>
    <input type="text" id="name" name="name" onChange={handleInputChange} value={updatediscount?.name }/><br></br>
    <lable>Unit Price (Rs) :</lable>
    <input type="text" id="price" name="price" onChange={handleInputChange} value={updatediscount?.price }/><br></br>
    <lable>Quantity Sold:</lable>
    <input type="text" id="quantity" name="quantity" onChange={handleInputChange} value={updatediscount?.quantity }/><br></br>
    <lable>Total Price(Rs) :</lable>
    <input type="text" id="total" name="total" onChange={handleInputChange} value={updatediscount?.total }/><br></br>

  



  
    <button onClick={handleUpdate}>Update Details</button><br></br> <br></br> 

 
        </div>
        </div>
    )
}
export default UpdateService;

