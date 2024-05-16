import { useQuery } from "@tanstack/react-query";
import ProductAPI from "../api/ProductAPI";

export const useProductData = () => {
  return useQuery(["products"], () => ProductAPI.getAll());
};

export const useProductCount = () => {
  return useQuery(["productCount"], () => ProductAPI.getCount());
};

export const useProduct = (id) => {
  return useQuery(["product", id], () => ProductAPI.getById(id));
};