import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function Chart() {
  const { items } = useSelector((state) => state.transactions);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Function to filter transactions by selected month
  const filteredData = items.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txnDate.getMonth() + 1 === selectedMonth;
  });

  // Prepare data for chart
  const data = filteredData.map((txn) => ({
    date: new Date(txn.date).toLocaleDateString(),
    amount: txn.amount,
  }));

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Monthly Expense Tracker
      </h2>

      <div className="flex justify-center mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={60}
              stroke="#fff"
            />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            />
            <Bar dataKey="amount" fill="#FFD700" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-lg text-white opacity-75">
          😕 No data found for this month.
        </p>
      )}
    </div>
  );
}
