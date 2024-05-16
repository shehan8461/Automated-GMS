import React, { useState, useContext } from "react";
import Toast from "../../utils/toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import OrderAPI from "../../api/OrderAPI";
import StripeAPI from "../../api/StripeAPI";
import { useShoppingCartStore } from "../../store/useShoppingCartStore";
import Swal from "sweetalert2";
import { errorMessage, successMessage } from "../../utils/Alert";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, resetCart } = useShoppingCartStore();

  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  // calculate total price of the cart items with quantity
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // credit card validation regex
  const cardNumberRegex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|2[2-7][0-9]{14}|3[47][0-9]{13}|65[0-9]{14}|6011[0-9]{12}|(644|645|646|647|648|649)[0-9]{13}|622(?:1[2-9]|[2-8][0-9]|9[01])[0-9]{10})$/;
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
  const cvvRegex = /^[0-9]{3}$/;

  const redirectToDashboard = () => {
    if (user?.role === USER_ROLES.ORDER_MANAGER) {
      navigate("/order_manager");
    } else if (user?.role === USER_ROLES.CUSTOMER) {
      navigate("/customer");
    } else {
      navigate("/");
    }
  };

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate: createOrder } = useMutation(OrderAPI.create, {
    onSuccess: () => {
      successMessage("Success", "Order created successfully");
    },
    onError: (error) => {
      errorMessage("Error", error.message);
    },
  });

  // Stripe payment processing mutation
  const { mutate: processPayment } = useMutation(
    StripeAPI.createPaymentIntent,
    {
      onSuccess: (data) => {
        successMessage("Success", "Payment processed successfully");
      },
      onError: (error) => {
        errorMessage("Error", error.message);
      },
    }
  );

  // Submit function
  const onSubmit = (values) => {
    // do the payment processing here - amount and card number
    processPayment({
      amount: totalPrice * 100,
      cardNumber: values.cardNumber,
      stripeCustomerId: user.stripeCustomerId,
    });

    const orderData = {
      customer: user._id,
      shippingAddress: values.shippingAddress,
      totalPrice: totalPrice,
      orderItems: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        material: item.material,
      })),
      status: "paid",
    };

    // if payment is successful, create the order
    createOrder(orderData);
    reset();
    resetCart();
    redirectToDashboard();
  };

  return (
    //   set max width to 1/2 of the screen
    <div className="container mt-4 mb-4" style={{ maxWidth: "50%" }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="my-2" htmlFor="shippingAddress">
            Shipping Address
          </label>
          <input
            placeholder="Enter your shipping address"
            type="text"
            className="form-control"
            id="shippingAddress"
            name="shippingAddress"
            {...register("shippingAddress", { required: true })}
          />
          {errors.name && (
            <small className="form-text text-danger">
              Shipping Address is required
            </small>
          )}
        </div>

        {/* Account Holder Name */}
        <div className="form-group">
          <label className="my-2" htmlFor="cardHolderName">
            Account Holder Name
          </label>
          <input
            placeholder="Name on the card"
            type="text"
            className="form-control"
            id="cardHolderName"
            name="cardHolderName"
            {...register("cardHolderName", { required: true })}
          />
          {errors.cardHolderName && (
            <small className="form-text text-danger">Name is required</small>
          )}
        </div>

        {/* Credit Card Details */}
        <div className="form-group">
          <label className="my-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            placeholder="Enter your card number"
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            {...register("cardNumber", {
              required: true,
              pattern: cardNumberRegex,
            })}
          />
          {errors.cardNumber && (
            <small className="form-text text-danger">Invalid card number</small>
          )}
        </div>

        {/* Expiry Date and CVV side by side */}
        <div className="form-group">
          <div className="d-flex justify-content-between gap-5">
            <div className="mr-2 w-50">
              <label className="my-2" htmlFor="expiryDate">
                Expiry Date
              </label>
              <input
                placeholder="MM/YY"
                type="text"
                className="form-control"
                id="expiryDate"
                name="expiryDate"
                {...register("expiryDate", {
                  required: true,
                  pattern: expiryDateRegex,
                })}
              />
              {errors.expiryDate && (
                <small className="form-text text-danger">
                  Invalid expiry date
                </small>
              )}
            </div>
            <div className="ml-2 w-50">
              <label className="my-2" htmlFor="cvv">
                CVV
              </label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                name="cvv"
                {...register("cvv", {
                  required: true,
                  pattern: cvvRegex,
                })}
              />
              {errors.cvv && (
                <small className="form-text text-danger">Invalid CVV</small>
              )}
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="mt-4">
          <h4>Total Price: Rs.{totalPrice}</h4>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
