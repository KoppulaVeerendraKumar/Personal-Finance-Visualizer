import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../services/transactionService";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return await getTransactions();
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (transaction, thunkAPI) => {
    await addTransaction(transaction);
    thunkAPI.dispatch(fetchTransactions());
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id, thunkAPI) => {
    await deleteTransaction(id);
    thunkAPI.dispatch(fetchTransactions());
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default transactionSlice.reducer;
