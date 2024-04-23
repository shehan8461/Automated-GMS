import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './updatediscount.css'

function UpdateDiscount(){
    const { id } = useParams();
    const [updatediscount,setupdatediscount]=useState({
        item:"",
        prize:"",
        dis:"",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/discount/${id}`);
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
          const response = await fetch(`http://localhost:8080/update_discount`, {
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
            console.log('User updated successfully');
           alert("updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='discount-update'>


    <lable>Item:</lable>
    <input type="text" id="item" name="item" onChange={handleInputChange} value={updatediscount?.item }/><br></br>
    <lable>Price:</lable>
    <input type="text" id="prize" name="prize" onChange={handleInputChange} value={updatediscount?.prize}/><br></br>
    <lable>Discount:</lable>
    <input type="text" id="dis" name="dis" onChange={handleInputChange} value={updatediscount?.dis}/><br></br> 
  



  
    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 
    <button><a href='/show_discounts'>Discount List</a></button>
 
        </div>
    )
}
export default UpdateDiscount;