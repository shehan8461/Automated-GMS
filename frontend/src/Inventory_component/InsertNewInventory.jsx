import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import backgroundImage from '../Inventory_component/Images/NewBg1.jpg';
import NavBar from './S_NavBar';

export default function InsertNewInventory() {

  const navigate = useNavigate(); 
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    ProductName: "",
    value: 0,
    quantity: "",
    minimumAmount: 5,
    description: "",
    productCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const regex = /^[a-zA-Z0-9\s]*$/;
    if (regex.test(value) || value === '') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }


    if (!value.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    const formErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key].toString().trim()) {
        formErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; 
    }

    axios.post("http://localhost:8080/stock/insert_stock", formData)
      .then((result) => {
        setInventory([...inventory, result.data]);
        setFormData({
          ProductName: "",
          value: 0,
          quantity: "",
          minimumAmount: "",
          description: "",
          productCode: "0",
        });
        setErrors({}); 
        console.log(result);
        alert("Data added successfully!");
        navigate('/Inventory')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '500px', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>

          <div style={{ width: "500px" }}>
            <div class="absolute top-0 right-0 flex flex-col items-end p-4">
              {/* <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2">
                <Link to="/Inventory" >
                  All Inventory
                </Link>
              </button> */}
            </div>
            <h2 class="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-black">Add Inventory</h2>

            <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div class="mb-5">
                <label for="ProductName" class="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Product Name</label>
                <input name="ProductName" value={formData.ProductName} onChange={handleInputChange} type="text" id="ProductName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Product Name" required />
                {errors.ProductName && <p className="text-red-500 text-xs italic">{errors.ProductName}</p>}
              </div>
              <div class="mb-5">
                <label for="productCode" class="block mb-2 text-xl font-medium text-gray-900 dark:text-black"> Product Code</label>
                <input name="productCode" value={formData.productCode} onChange={handleInputChange} type="text" id="productCode" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='Product Code' required />
                {errors.productCode && <p className="text-red-500 text-xs italic">{errors.productCode}</p>}
              </div>
              <div class="mb-5">
                <label for="value" class="block mb-2 text-xl font-medium text-gray-900 dark:text-black"> Value</label>
                <input name="value" value={formData.value} onChange={handleInputChange} type="text" id="value" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                {errors.value && <p className="text-red-500 text-xs italic">{errors.value}</p>}
              </div>
              <div class="mb-5">
                <label for="description" class="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Description</label>
                <input name="description" value={formData.description} onChange={handleInputChange} type="text" id="Description" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='Description' required />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
              </div>
              <div class="mb-5">
                <label for="quantity" class="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Quantity</label>
                <input name="quantity" value={formData.quantity} onChange={handleInputChange} type="Number" id="Quantity" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='quantity' required />
                {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
              </div>
              <div class="mb-5">
                <label for="minimumAmount" class="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Minimum Amount</label>
                <input name="minimumAmount" value={formData.minimumAmount} onChange={handleInputChange} type="Number" id="minimumAmount" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                {errors.minimumAmount && <p className="text-red-500 text-xs italic">{errors.minimumAmount}</p>}
              </div>
              <button type="submit" class="text-black bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Stock</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
