import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import BudgetForm from "../components/BudgetForm";
import BudgetVsActualChart from "../components/BudgetVsActualChart";
import SpendingInsights from "../components/SpendingInsights";
import Chart from "../components/Chart";
import CategoryPieChart from "../components/CategoryPieChart";
import SummaryCards from "../components/SummaryCards";

export default function Home() {
  // const currentMonth = new Date().toISOString().slice(0, 7);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
        💸 Personal Finance Visualizer 💸
      </h1>

      <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
        {/* Transaction Form */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <TransactionForm />
        </div>

        {/* Budget Form */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <BudgetForm />
        </div>

        {/* Budget vs Actual Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          {/* <BudgetVsActualChart month={currentMonth} /> */}
          <BudgetVsActualChart />
        </div>

        {/* Monthly Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <Chart />
        </div>

        {/* Category Pie Chart with BIGGER space now */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
          <CategoryPieChart />
        </div>

        {/* Spending Insights */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <SpendingInsights />
        </div>

        {/* Summary Cards */}
        <div className="mb-6">
          <SummaryCards />
        </div>

        {/* Transaction List */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
