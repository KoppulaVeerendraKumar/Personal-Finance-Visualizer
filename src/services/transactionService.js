import { api } from "../utils/api";

export const getTransactions = async () => {
  const response = await api.get("/");
  return response.data;
};

export const addTransaction = async (transaction) => {
  const response = await api.post("/", transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  await api.delete(`/${id}`);
};
