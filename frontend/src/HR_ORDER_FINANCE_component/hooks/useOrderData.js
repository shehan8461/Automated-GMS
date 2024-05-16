import { useQuery } from "@tanstack/react-query";
import OrderAPI from "../api/OrderAPI";

export const useOrderData = () => {
  return useQuery(["orders"], () => OrderAPI.getAll());
};

export const useCustomerOrderData = () => {
  return useQuery(["customerOrders"], () => OrderAPI.getByCustomer());
}

export const useOrderCount = () => {
  return useQuery(["orderCount"], () => OrderAPI.getCount());
}

export const useTotalSales = () => {
  return useQuery(["totalSales"], () => OrderAPI.getTotalSales());
}