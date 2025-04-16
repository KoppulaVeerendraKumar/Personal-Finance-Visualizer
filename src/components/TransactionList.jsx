import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  removeTransaction,
} from "../store/transactionSlice";

export default function TransactionList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-gray-500">Loading transactions...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-purple-700">
        Transaction History
      </h3>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found</p>
      ) : (
        <div className="space-y-4">
          {items.map((txn) => (
            <div
              key={txn._id}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center transition-transform transform hover:scale-105 hover:bg-gray-200"
            >
              <div>
                <p className="text-lg text-left font-semibold text-gray-800">
                  {txn.description}
                </p>
                <p className="text-sm text-left text-gray-600">
                  ₹{txn.amount.toLocaleString()} - {txn.category}
                </p>
                <p className="text-xs text-left text-gray-500">
                  {new Date(txn.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => dispatch(removeTransaction(txn._id))}
                className="text-red-600 bg-red-100 px-3 py-1 rounded-lg hover:bg-red-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
