import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

export default function CategoryPieChart() {
  const { items } = useSelector((state) => state.transactions);

  // ✅ Dynamically fetch category from transaction data
  const categoryTotals = items.reduce((acc, txn) => {
    const category = txn.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + txn.amount;
    return acc;
  }, {});

  const data = Object.keys(categoryTotals)
    .map((category) => ({
      name: category,
      value: categoryTotals[category],
    }))
    .filter((item) => item.value > 0);

  const colors = [
    "#FF6347",
    "#FFD700",
    "#FF69B4",
    "#4CAF50",
    "#8884d8",
    "#20B2AA",
    "#FF4500",
    "#32CD32",
    "#4682B4",
    "#DAA520",
  ];

  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          💹 Category Wise Spending
        </h2>
        {data.length > 0 ? (
          <PieChart width={600} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <p className="text-gray-500">No data available for this month 😢</p>
        )}
      </div>
    </div>
  );
}
