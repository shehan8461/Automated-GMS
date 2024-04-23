import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './updateSupplier.css'; 

function UpdateSupplier() {
    const { id } = useParams();

    const [supplierData, setsupplierData] = useState({
        name: "",
        phone: "",
        product: "",
        type: "",
        unitPrice: "",
        contractStart: "",
        contractEnd: "",
    });

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user_supplier/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setsupplierData(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchSupplierData();
    }, []);

    const handleInputChange = (e) => {
        setsupplierData({
            ...supplierData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/update_supplier`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: supplierData._id,
                    ...supplierData,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('User updated successfully');
                alert("Data updated successfully!");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert("Error updating successfully!");
        }
    };

    return (
        <div>
            <br />
            <div className="update-container-form">
                <div className="mb-3">
                    <label htmlFor="name" className="update-form-label">
                        Supplier Name / Company Name
                    </label>
                    <br />
                    <input
                        type="text"
                        className="update-form-control"
                        id="name"
                        name="name"
                        placeholder="Enter Supplier Name"
                        onChange={handleInputChange}
                        value={supplierData?.name}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="update-form-label">
                        Supplier contact number
                    </label>
                    <br />
                    <input
                        type="text"
                        className="update-form-control"
                        id="phone"
                        name="phone"
                        placeholder="XXX-XXXXXXX"
                        onChange={handleInputChange}
                        value={supplierData?.phone}
                    />
                </div>
                <br />

                <div className="mb-3">
                    <label htmlFor="product" className="update-form-label">
                        Product category
                    </label>
                    <br />
                    <select
                        className="update-form-select"
                        id="product"
                        name="product"
                        onChange={handleInputChange}
                        value={supplierData?.product}
                    >
                        <option value="">Select the category</option>
                        <option value="cotton">Cotton</option>
                        <option value="nylon">Nylon</option>
                        <option value="polyester">Polyester</option>
                        <option value="linen">Linen</option>
                        <option value="silk">Silk</option>
                        <option value="beads">Beads</option>
                        <option value="zipper">Zippers</option>
                        <option value="ribbon">Ribbons</option>
                        <option value="dye">Fabric dyes</option>
                        <option value="box">Shipping Boxes</option>
                        <option value="sewingThread">Sewing Threads</option>
                        <option value="elastic">Elastics</option>
                        <option value="glue">Glues</option>
                        <option value="lableTag">Labels and Tags</option>
                    </select>
                </div>

                <br />

                <div className="mb-3">
                    <label htmlFor="type" className="update-form-label">
                        Type of the product that is supplied
                    </label>
                    <br />
                    <select
                        className="update-form-select"
                        id="type"
                        name="type"
                        onChange={handleInputChange}
                        value={supplierData?.type}
                    >
                        <option value="">Select the category</option>
                        <option value="local">Local</option>
                        <option value="imported">Imported</option>
                    </select>
                </div>

                <br />

                <div className="mb-3">
                    <label htmlFor="unitPrice" className="update-form-label">
                        Price per unit (Rs.)
                    </label>
                    <br />
                    <input
                        type="text"
                        className="update-form-control"
                        id="unitPrice"
                        name="unitPrice"
                        placeholder="Enter the price per unit in Rupees"
                        onChange={handleInputChange}
                        value={supplierData?.unitPrice}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="contractStart" className="update-form-label">
                        Start date of the contract
                    </label>
                    <br />
                    <input
                        type="text"
                        className="update-form-control"
                        id="contractStart"
                        name="contractStart"
                        placeholder="dd/mm/yyyy"
                        onChange={handleInputChange}
                        value={supplierData?.contractStart}
                    />
                </div>

                <br />

                <div className="mb-3">
                    <label htmlFor="contractEnd" className="update-form-label">
                        End date of the contract
                    </label>
                    <br />
                    <input
                        type="text"
                        className="update-form-control"
                        id="contractEnd"
                        name="contractEnd"
                        placeholder="dd/mm/yyyy"
                        onChange={handleInputChange}
                        value={supplierData?.contractEnd}
                    />
                </div>

                <br />

                <center><button onClick={handleUpdate} className="update-btn-primary">
                    Update
                </button></center>

            </div>
        </div>
    )
}

export default UpdateSupplier;
