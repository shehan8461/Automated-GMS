import { useQuery } from "@tanstack/react-query";
import UserAPI from "../api/UserAPI";

export const useUserData = () => {
  return useQuery(["users"], () => UserAPI.getUsers());
};

export const useUser = (id) => {
  return useQuery(["user", id], () => UserAPI.getUserById(id));
};

export const useUserCount = () => {
  return useQuery(["userCount"], () => UserAPI.getUsersCount());
};

export const useResignedEmployees = () => {
  return useQuery(["resignedEmployees"], () => UserAPI.getResignedEmployees());
};

export const useResignedEmployeesCount = () => {
  return useQuery(["resignedEmployeesCount"], () =>
    UserAPI.getResignedEmployeesCount()
  );
};
