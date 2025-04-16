import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../store/transactionSlice";

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment"];

export default function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !description || !date) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      amount,
      description,
      category,
      date,
    };

    dispatch(createTransaction(newTransaction));

    // Reset Form
    setAmount("");
    setDescription("");
    setCategory(categories[0]);
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-lg space-y-4"
    >
      <h3 className="text-xl font-semibold text-purple-700">Add Transaction</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-purple-600 text-white p-3 w-full rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        💸 Add Transaction
      </button>
    </form>
  );
}
