import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SummaryCards() {
  const { items } = useSelector((state) => state.transactions);

  const totalExpense = items.reduce((acc, txn) => acc + txn.amount, 0);
  const recentTransactions = items.slice(-3).reverse();

  const categoryTotals = items.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-white shadow-lg rounded-lg">
      {/* Total Expenses Card */}
      <div className="p-6 bg-purple-600 text-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total Expenses</h3>
        <p className="text-2xl font-bold">₹{totalExpense}</p>
      </div>

      {/* Category Breakdown */}
      <div className="p-6 bg-blue-600 text-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} layout="vertical" barSize={20}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              width={100}
              tick={{ fill: "white" }}
            />
            <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
            <Bar dataKey="amount" fill="#FFD700" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="p-6 bg-green-600 text-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        {recentTransactions.map((txn) => (
          <div
            key={txn._id}
            className="bg-white text-black p-2 rounded mb-2 shadow-sm"
          >
            <p className="text-sm font-medium">{txn.description}</p>
            <p className="text-xs text-gray-600">₹{txn.amount}</p>
            <p className="text-xs text-gray-500">
              {new Date(txn.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
