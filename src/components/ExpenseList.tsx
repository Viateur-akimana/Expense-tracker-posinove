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
  "Other",
];

const ExpenseList: React.FC<Props> = ({ expenses, onDeleteExpense }) => {
  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate();

  const filteredExpenses = expenses.filter((expense) =>
    filter ? expense.category === filter : true
  );

  return (
    <div className="mt-8 max-w-full px-4">

      <div className="flex flex-col md:flex-row gap-5 mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-200">
          <a href="/add">Add New Expense</a>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left border-b">Category</th>
              <th className="py-3 px-4 text-left border-b">Amount</th>
              <th className="py-3 px-4 text-left border-b">Date</th>
              <th className="py-3 px-4 text-left border-b">Description</th>
              <th className="py-3 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-2 px-4 border-b">{expense.category}</td>
                <td className="py-2 px-4 border-b">${expense.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{expense.date}</td>
                <td className="py-2 px-4 border-b">{expense.description}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => navigate(`/edit/${expense.id}`)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded-lg shadow hover:bg-yellow-600 transition duration-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
