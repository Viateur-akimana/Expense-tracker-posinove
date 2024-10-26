import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
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
    "Other"
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
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(75,192,192,0.6)",
          "rgba(153,102,255,0.6)",
          "rgba(255,159,64,0.6)",
          "rgba(100,100,255,0.6)",
          "rgba(255,200,200,0.6)",
          "rgba(200,255,200,0.6)",
          "rgba(200,200,255,0.6)"
        ],
      },
    ],
  };

  // Prepare data for Bar chart (daily expenses)
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
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-sm mx-auto flex">
      <div>
        <h2 className="text-lg font-bold">Expenses Distribution by Category</h2>
        <div className="w-full h-64">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mt-8">Daily Expenses</h2>
        <div className="w-full h-64">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
