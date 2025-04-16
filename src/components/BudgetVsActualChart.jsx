import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BASE_API } from "../utils/api";

export default function BudgetVsActualChart() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState([]);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("March");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsRes = await axios.get(`${BASE_API}/api/transactions`);
        setTransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const monthIndex = new Date(`${month} 1, 2025`).getMonth();
    const year = new Date().getFullYear();
    const formattedMonth = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

    const fetchBudget = async () => {
      try {
        const budgetRes = await axios.get(
          `${BASE_API}/api/budget/${formattedMonth}`
        );
        setBudget(budgetRes.data);
      } catch (error) {
        console.error("Error fetching budget", error);
      }
    };

    fetchBudget();
  }, [month]);

  useEffect(() => {
    const monthIndex = new Date(`${month} 1, 2025`).getMonth();

    const filteredTransactions = transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      return txnDate.getMonth() === monthIndex;
    });

    const categoryTotals = filteredTransactions.reduce((acc, txn) => {
      const category = txn.category;
      acc[category] = (acc[category] || 0) + txn.amount;
      return acc;
    }, {});

    const chartData = budget.map((budgetItem) => {
      const category = budgetItem.category;
      return {
        category: category,
        budget: budgetItem.budget,
        actual: categoryTotals[category] || 0,
        difference: (categoryTotals[category] || 0) - budgetItem.budget,
      };
    });

    setData(chartData);
  }, [month, transactions, budget]);

  return (
    <div className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-xl text-white mt-6 transition-all duration-500">
      <h2 className="text-2xl font-bold mb-6 text-center">
        💸 Budget vs Actual Spending ({month})
      </h2>

      <div className="text-center mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Bar dataKey="budget" fill="#FFD700" radius={[5, 5, 0, 0]} />
            <Bar dataKey="actual" fill="#FF4500" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-lg text-white opacity-75">
          😕 No data found for {month}.
        </p>
      )}
    </div>
  );
}
