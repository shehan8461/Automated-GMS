import React, { useState } from "react";
import { useShoppingCartStore } from "../../store/useShoppingCartStore";
import Toast from "../../utils/toast";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

const ProductDetailPage = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  //
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useShoppingCartStore();

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      quantity: Math.min(quantity, product?.countInStock), // Ensure we don't add more than the available countInStock
      size: selectedSize,
      color: selectedColor,
      material: selectedMaterial,
    };
    addToCart(itemToAdd);
    Toast({ type: "success", message: "Added to cart" });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product?.image} alt={product?.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <h3>Rs.{product?.price}</h3>
          <p>Available Stock: {product?.countInStock}</p>
          <div>
            <h4>Size</h4>
            <div className="d-flex">
              {product?.sizes.map((size) => (
                <button
                  key={size}
                  className={`btn btn-outline-primary me-2 ${
                    selectedSize === size ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedSize(size);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4>Color</h4>
            <div className="d-flex">
              {product?.colors.map((color) => (
                <button
                  key={color}
                  className={`btn me-2 ${
                    selectedColor === color ? "active" : ""
                  }`}
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: `3px solid ${
                      selectedColor === color ? "black" : color
                    }`,
                  }}
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                ></button>
              ))}
            </div>
          </div>
          <div>
            <h4>Material</h4>
            <div className="d-flex">
              {product?.materials.map((material) => (
                <button
                  key={material}
                  className={`btn btn-outline-primary me-2 ${
                    selectedMaterial === material ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedMaterial(material);
                  }}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>
          {user && user.role === USER_ROLES.CUSTOMER && (
            <div className="d-flex align-items-center mt-3">
              <input
                type="number"
                className="form-control me-2"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product?.countInStock}
                style={{ width: "80px" }}
              />
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                  disabled={product?.countInStock === 0||
                    !selectedSize||
                    !selectedColor||
                    !selectedMaterial}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
