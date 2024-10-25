import React from "react";
import { Bar } from "react-chartjs-2";
import { Expense } from "../types/expense";

type Props = {
  expenses: Expense[];
};

const ExpenseChart: React.FC<Props> = ({ expenses }) => {
    const categories = Array.from(new Set(expenses.map((e) => e.category)));

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categories.map((cat) =>
          expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
        ),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default ExpenseChart;
