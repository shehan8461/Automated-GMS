import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const store = (set) => ({
  ...initialState,
  login: (user, token) => {
    set({
      isAuthenticated: true,
      user,
      token,
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  },
});

export const useAuthStore = create(
  devtools(persist(store, { name: "authStore" }), "authStore")
);
