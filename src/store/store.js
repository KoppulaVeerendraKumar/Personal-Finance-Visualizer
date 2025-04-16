import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../store/transactionSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});
