import React from "react";
import { useShoppingCartStore } from "../../store/useShoppingCartStore";
import NavBar from "../../components/NavBar";
import Toast from "../../utils/toast";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, resetCart } =
    useShoppingCartStore();

  const handleQuantityChange = (itemId, quantity) => {
    // if quantity is less than 1, set it to 1
    quantity = Math.max(1, quantity);
    updateItemQuantity(itemId, quantity);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    Toast({ type: "success", message: "Item removed from cart" });
  };

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h2 className="mb-3">Shopping Cart</h2>
        {cartItems.length > 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item?._id} className="align-middle">
                    <td className="d-flex align-items-center gap-3">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      {item?.name}
                    </td>
                    <td>Rs.{item?.price}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: "80px" }}
                        value={item?.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item?._id, e.target.value)
                        }
                        min="1"
                        max={item?.countInStock}
                      />
                    </td>
                    <td>Rs.{item?.price * item?.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromCart(item?._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h4 className=" text-end">
                Total: Rs.
                {cartItems.reduce(
                  (total, item) => total + item?.price * item?.quantity,
                  0
                )}
              </h4>
              <div>
                <button className="btn btn-secondary" onClick={resetCart}>
                  Reset Cart
                </button>
                <a href="/checkout" className="btn btn-warning ms-2">
                  Checkout
                </a>
              </div>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
