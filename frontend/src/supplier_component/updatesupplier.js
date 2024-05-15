import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './updateSupplier.css'; 

function UpdateSupplier() {
    const { id } = useParams();

    const [supplierData, setsupplierData] = useState({
        name: "",
        phone: "",
        email: "",
        product: "",
        type: "",
        unitPrice: "",
        contractStart: "",
        contractEnd: "",
    });

    const [errors, setErrors] = useState({});

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
        const { value, name } = e.target;
        setsupplierData({
            ...supplierData,
            [name]: value,
        });

        const fieldErrors = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: fieldErrors[name]
        }));
    };

    const validateField = (fieldName, value) => {
        const fieldErrors = {};
    
        // Validation rules for the specific field
        switch (fieldName) {
            case 'name':
                if (!value.trim()) {
                    fieldErrors.name = "Supplier name is required";
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    fieldErrors.name = "Invalid format";
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    fieldErrors.phone = "Supplier contact number is required";
                } else if (!/^\d{3}-\d{7}$/.test(value)) {
                    fieldErrors.phone = "Invalid phone number format (e.g., XXX-XXXXXXX)";
                }
                break;
            case 'email':
                if (!value.trim()) {
                    fieldErrors.email = "Supplier email address is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    fieldErrors.email = "Invalid email address format";
                }
                break;
            case 'product':
                if (!value.trim()) {
                    fieldErrors.product = "Product category is required";
                }
                break;
            case 'type':
                if (!value.trim()) {
                    fieldErrors.type = "Type of product supplied is required";
                }
                break;
            case 'unitPrice':
                if (!value.trim()) {
                    fieldErrors.unitPrice = "Price per unit is required";
                } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                    fieldErrors.unitPrice = "Invalid price format";
                }
                break;
            case 'contractStart':
                if (!value) {
                    fieldErrors.contractStart = "Contract start date is required";
                }
                break;
            case 'contractEnd':
                if (!value) {
                    fieldErrors.contractEnd = "Contract end date is required";
                } else if (value <= supplierData.contractStart) {
                    fieldErrors.contractEnd = "Contract end date must be after the contract start date";
                }
                break;
            default:
                break;
        }
    
        return fieldErrors;
    };

    const handleUpdate = async () => {
        const formErrors = {};
        
        // Validate all fields before submitting the form
        Object.keys(supplierData).forEach((key) => {
            const fieldErrors = validateField(key, supplierData[key]);
            if (Object.keys(fieldErrors).length > 0) {
                formErrors[key] = fieldErrors[key];
            }
        });
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
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
        }
    };

    return (
        <div>
            <body className='supplier_background'>
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
                    {errors.name && <span className="text-danger">{errors.name}</span>}
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
                    {errors.phone && <span className="text-danger">{errors.phone}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="update-form-label">
                        Supplier E-mail Address :
                    </label>
                    <br />
                    <input
                        type="text"
                        className="update-form-control"
                        id="email"
                        name="email"
                        placeholder="someone@abc.com"
                        onChange={handleInputChange}
                        value={supplierData?.email}
                    />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>

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
                    {errors.product && <span className="text-danger">{errors.product}</span>}
                </div>

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
                    {errors.type && <span className="text-danger">{errors.type}</span>}
                </div>

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
                    {errors.unitPrice && <span className="text-danger">{errors.unitPrice}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="contractStart" className="update-form-label">
                        Start date of the contract
                    </label>
                    <br />
                    <input
                        type="date"
                        className="update-form-control"
                        id="contractStart"
                        name="contractStart"
                        onChange={handleInputChange}
                        value={supplierData?.contractStart}
                    />
                    {errors.contractStart && <span className="text-danger">{errors.contractStart}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="contractEnd" className="update-form-label">
                        End date of the contract
                    </label>
                    <br />
                    <input
                        type="date"
                        className="update-form-control"
                        id="contractEnd"
                        name="contractEnd"
                        onChange={handleInputChange}
                        value={supplierData?.contractEnd}
                    />
                    {errors.contractEnd && <span className="text-danger">{errors.contractEnd}</span>}
                </div>

                <br />

                <center>
                    <button onClick={handleUpdate} className="update-btn-primary">
                        Update
                    </button>
                </center>

            </div>
            </body>
        </div>
    )
}

export default UpdateSupplier;
