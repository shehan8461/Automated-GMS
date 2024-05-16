import { useQuery } from "@tanstack/react-query";
import BankCommunicationAPI from "../api/BankCommunicationAPI";

export const useBankCommunicationData = () => {
  return useQuery(["bankCommunications"], () => BankCommunicationAPI.getAll());
};

export const useBankCommunicationCount = () => {
  return useQuery(["bankCommunicationCount"], () =>
    BankCommunicationAPI.getCount()
  );
};

export const useBankCommunication = (id) => {
  return useQuery(["bankCommunication", id], () =>
    BankCommunicationAPI.getById(id)
  );
};

export const useTotalAmountThisMonth = () => {
  return useQuery(["totalAmountThisMonth"], () =>
    BankCommunicationAPI.getTotalAmountThisMonth()
  );
};
