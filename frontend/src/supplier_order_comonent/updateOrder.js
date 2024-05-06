import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function UpdateOrder() {
    const { id } = useParams();

    const [orderdata, setorderdata] = useState({
        name: "",
        product: "",
        quantity: "",
        date: "",
    });

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/order/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setorderdata(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, []);

    const handleInputChange = (e) => {
        setorderdata({
            ...orderdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/updateorder_supplier/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: orderdata._id,
                    ...orderdata,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Order updated successfully');
                alert('Order updated successfully');
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div className="order-form">




         
            <h2>Update Order</h2>
          
            <label className="form-label1">Supplier / Company Name : </label>
            <input
                        type="text"
                        className="update-form-control"
                        id="name"
                        name="name"
                        placeholder="Enter Supplier Name"
                        onChange={handleInputChange}
                       
                        value={orderdata.name}
                        
                    />
          <br></br>
       
            <label for="product" className="form-label1">
              Product 
            </label>
            <br></br>
            <input
              type="text"
              id="product"
              name="product"
              placeholder="Enter Product "
              onChange={handleInputChange}
              value={orderdata.product}
            /><br/><br/>
      

      <label for="quantity" className="form-label1">
              Quantity Needed
            </label>
            <br></br>
            <input
              type="text"              
              id="quantity"
              name="quantity"
              placeholder="Enter Quantity Needed"
              onChange={handleInputChange}
              value={orderdata.quantity}
            />
            <br/><br/>


<label for="date" className="form-label1">
              Date
            </label>
            <br></br>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Enter the date"
              onChange={handleInputChange}
              value={orderdata.date}
            />

            <br/><br/><br/>
            <center><button onClick={handleUpdate} className="update-btn-primary">
                    Update
                </button></center>
          
        </div>
    )
}

export default UpdateOrder;
