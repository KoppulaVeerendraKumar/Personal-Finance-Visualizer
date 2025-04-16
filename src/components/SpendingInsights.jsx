import { useSelector } from "react-redux";

export default function SpendingInsights() {
  const { items } = useSelector((state) => state.transactions);

  if (items.length === 0) {
    return (
      <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          💸 Spending Insights
        </h2>
        <p className="text-center text-lg opacity-75">
          😕 No spending recorded yet.
        </p>
      </div>
    );
  }

  const totalExpense = items.reduce((acc, txn) => acc + txn.amount, 0);
  const highSpendingCategory = items.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const sortedCategories = Object.keys(highSpendingCategory).sort(
    (a, b) => highSpendingCategory[b] - highSpendingCategory[a]
  );

  const topCategory = sortedCategories[0] || "None";
  const topThreeCategories = sortedCategories.slice(0, 3);

  const categoryColors = {
    Food: "bg-red-500",
    Transport: "bg-blue-500",
    Shopping: "bg-green-500",
    Bills: "bg-yellow-500",
    Entertainment: "bg-purple-500",
    None: "bg-gray-500",
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        💸 Spending Insights
      </h2>

      <div className="text-center mb-6">
        <h3 className="text-4xl font-bold">₹ {totalExpense.toFixed(2)}</h3>
        <p className="text-sm opacity-75">Total Spending</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white text-gray-700 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">🏆 Highest Spending Category</h4>
          <p
            className={`text-xl font-bold ${categoryColors[topCategory]} text-white rounded-lg px-3 py-2 mt-2`}
          >
            {topCategory} - ₹{" "}
            {highSpendingCategory[topCategory]
              ? highSpendingCategory[topCategory].toFixed(2)
              : "0.00"}
          </p>
        </div>

        <div className="p-4 bg-white text-gray-700 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">🔥 Top 3 Categories</h4>
          {topThreeCategories.length > 0 ? (
            topThreeCategories.map((cat) => (
              <div
                key={cat}
                className={`flex justify-between mt-2 ${categoryColors[cat]} text-white rounded-lg px-3 py-2`}
              >
                <span>{cat}</span>
                <span>₹ {highSpendingCategory[cat].toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No spending data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
