import { useQuery } from "@tanstack/react-query";
import FundAPI from "../api/FundAPI";

export const useFundData = () => {
  return useQuery(["funds"], () => FundAPI.getAll());
};

export const useFundCount = () => {
  return useQuery(["fundCount"], () => FundAPI.getCount());
};

export const useFund = (id) => {
  return useQuery(["fund", id], () => FundAPI.getById(id));
};
