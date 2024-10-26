import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Expense } from "../types/expense";

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type Props = {
  expenses: Expense[];
};

const ExpenseChart: React.FC<Props> = ({ expenses }) => {
  const categoriesList = [
    "Food & Dining",
    "Housing",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Healthcare",
    "Utilities",
    "Education",
    "Travel",
    "Other",
  ];

  const pieData = {
    labels: categoriesList,
    datasets: [
      {
        label: "Expenses Distribution",
        data: categoriesList.map((cat) =>
          expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0)
        ),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
          "#9966FF", "#FF9F40", "#6464FF", "#FFC8C8",
          "#C8FFC8", "#C8C8FF"
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const dailyExpenses = expenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const barData = {
    labels: Object.keys(dailyExpenses),
    datasets: [
      {
        label: "Daily Expenses",
        data: Object.values(dailyExpenses),
        backgroundColor: "#4BC0C0",
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 8,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid gap-8 md:grid-cols-2">
      {/* Pie Chart - Category Distribution */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Expenses Distribution by Category
        </h2>
        <div className="h-72">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>

      {/* Bar Chart - Daily Expenses */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Daily Expenses
        </h2>
        <div className="h-72">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
