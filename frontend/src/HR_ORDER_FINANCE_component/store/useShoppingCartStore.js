import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  cartItems: [],
};

const shoppingCartStore = (set) => ({
  ...initialState,
  // Action to add an item to the cart or update its quantity if it already exists
  addToCart: (newItem) =>
    set((state) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );
      if (itemIndex > -1) {
        // if quantity and the already added quantity is greater than the available stock, make the quantity equal to the available stock
        const newQuantity =
          state.cartItems[itemIndex].quantity + newItem.quantity;
        const updatedItem = {
          ...state.cartItems[itemIndex],
          quantity: Math.min(newQuantity, newItem.countInStock),
        };
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === newItem._id ? updatedItem : item
          ),
        };
      } else {
        // Item doesn't exist, add to cart
        return { cartItems: [...state.cartItems, newItem] };
      }
    }),
  // Action to remove an item from the cart by _id
  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== itemId),
    })),
  // Action to update the quantity of a specific item in the cart
  updateItemQuantity: (itemId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: quantity } : item
      ),
    })),
  // Action to reset the cart
  resetCart: () => set(initialState),
});

export const useShoppingCartStore = create(
  devtools(
    persist(shoppingCartStore, { name: "shoppingCartStore" }),
    "shoppingCartStore"
  )
);
