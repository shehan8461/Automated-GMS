import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import backgroundImage from '../Inventory_component/Images/NewBg1.jpg';
import NavBar from './S_NavBar.jsx';
import { useParams } from 'react-router-dom';


// export default function UpdateInventory({ match }) {
//   const [productName, setProductName] = useState('');
//   const [productCode, setProductCode] = useState('');
//   const [value, setValue] = useState('');
//   const [description, setDescription] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [minimumAmount, setMinimumAmount] = useState('');
//   const [product, setProduct] = useState({
//       ProductName: '',
//       productCode: '',
//       value: '',
//       description: '',
//       quantity: '',
//       minimumAmount: ''
//   });

export default function UpdateInventory() {

  const navigate = useNavigate(); 
  const { id } = useParams(); 
  const [product, setProduct] = useState({
    ProductName: '',
    productCode: '',
    value: '',
    description: '',
    quantity: '',
    minimumAmount: '',
  });

  useEffect(() => {
      async function fetchProduct() {
          try {
              const response = await axios.get(`http://localhost:8080/stock/selected_stock/${id}`);
             // const response = await axios.get(`http://localhost:5050/update_stock/${match.params.id}`);

              setProduct(response.data);
          } catch (error) {
              console.error('Error fetching product:', error);
          }
      }

      fetchProduct();
  // }, [match.params.id]);
}, [id]);

  const handleSubmit = async (e) => {
      e.preventDefault();

      // const payload = {
      //   ProductName: productName,
      //   productCode: productCode,
      //   value: value,
      //   description: description,
      //   quantity: quantity,
      //   minimumAmount: minimumAmount 
      // };

      try {
          await axios.put(`http://localhost:5050/stock/update_stock/${id}`, product);
          console.log('Product updated successfully');  
          alert('Product updated successfully');
          navigate('/Inventory')
      } catch (error) {
          console.error('Error updating product:', error);
      }
  };


  return (
    <div>
      <NavBar />
       <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
       <div style={{width: '500px', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',}}>

       <div class="absolute top-0 right-0 flex flex-col items-end p-4">
        {/* <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2">
        <Link to="/Inventory" >
        All Inventory
        </Link>  
        </button> */}
      </div>
      {/* <div style={{width:"500px"}}></div> */}

      <section className="bg-blue-100">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-black">Update Inventory</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label htmlFor="ProductName" className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Product Name</label>
                <input type="text" name="ProductName" id="ProductName" value={product.ProductName} 
               // onChange={(e) => setProductName(e.target.value)} 
               onChange={(e) => setProduct({ ...product, ProductName: e.target.value })}
                className="bg-white border border-white text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-white dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="productCode" className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Product Code</label>
                <input type="text" name="productCode" id="productCode" value={product.productCode} 
                //onChange={(e) => setProductCode(e.target.value)} 
                onChange={(e) => setProduct({ ...product, productCode: e.target.value })}
                className="bg-white border border-white text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-white dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="value" className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Value</label>
                <input type="text" name="value" id="value" value={product.value} 
                //onChange={(e) => setValue(e.target.value)}
                onChange={(e) => setProduct({ ...product, value: e.target.value })}
                 className="bg-white border border-white text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-white dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Description</label>
                <input type="text" name="description" id="description" value={product.description}
                 //onChange={(e) => setDescription(e.target.value)} 
                 onChange={(e) => setProduct({ ...product, description: e.target.value })}
                 className="bg-white border border-white text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-white dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="quantity" className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">Quantity</label>
                <input type="Number" name="quantity" id="quantity" value={product.quantity}
                // onChange={(e) => setQuantity(e.target.value)} 
                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                 className="bg-white border border-white text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-white dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="minimumAmount" className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">MinimumAmount</label>
                <input type="Number" name="minimumAmount" id="minimumAmount" value={product.minimumAmount} 
                // onChange={(e) => setMinimumAmount(e.target.value)}
                onChange={(e) => setProduct({ ...product, minimumAmount: e.target.value })}
                 className="bg-white border border-white text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-white dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button type="submit" className="text-white bg-orange-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              
                Update Inventory
              </button>
              {/* <button type="button" class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                  <svg class="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                  Delete
              </button> */}

            </div>
          </form>
        </div>
      </section>
      </div>
      </div> 
    </div>
  );
}
