import { useQuery } from "@tanstack/react-query";
import ExpenseAPI from "../api/ExpenseAPI";

export const useExpenseData = () => {
  return useQuery(["expenses"], () => ExpenseAPI.getAll());
};

export const useExpenseCount = () => {
  return useQuery(["expenseCount"], () => ExpenseAPI.getCount());
};

export const useExpense = (id) => {
  return useQuery(["expense", id], () => ExpenseAPI.getById(id));
};

export const useTotalAmountThisMonth = () => {
  return useQuery(["totalAmountThisMonth"], () =>
    ExpenseAPI.getTotalAmountThisMonth()
  );
};
