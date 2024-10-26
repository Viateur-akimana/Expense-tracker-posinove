import React, { useState } from "react";
import { Expense } from "../types/expense";
import { useNavigate } from "react-router-dom";

type Props = {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
};

const categories = [
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

const ExpenseList: React.FC<Props> = ({ expenses, onDeleteExpense }) => {
  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate()

  // Filter expenses based on the category
  const filteredExpenses = expenses.filter((expense) =>
    filter ? expense.category === filter : true
  );

  return (
    <div className="mt-4">
        <div className="flex gap-5">
        <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button className="bg-green-500"><a href="/add">Add new expense</a></button>
        </div>
     
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td className="py-2 px-4 border">{expense.category}</td>
              <td className="py-2 px-4 border">${expense.amount.toFixed(2)}</td>
              <td className="py-2 px-4 border">{expense.date}</td>
              <td className="py-2 px-4 border">{expense.description}</td>
              <td className="py-2 px-4 border">
                <button
                 onClick={() => navigate(`/edit/${expense.id}`)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteExpense(expense.id)} // Call delete function
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
