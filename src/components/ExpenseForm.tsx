import React, { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onAddExpense: (expense: Expense) => void;
  editingExpense: Expense | null; // Prop for editing
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

const ExpenseForm: React.FC<Props> = ({ onAddExpense, editingExpense }) => {
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  // Populate form fields if editing an existing expense
  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setDescription(editingExpense.description);
    } else {
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount === "" || isNaN(Number(amount)) || !category || !date || !description) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const newExpense: Expense = {
      id: editingExpense ? editingExpense.id : uuidv4(), // Use existing id for editing
      amount: Number(amount),
      category,
      date,
      description,
    };

    onAddExpense(newExpense);
    navigate("/"); // Navigate back to home or another route after submission
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">{editingExpense ? "Update Expense" : "Add Expense"}</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber || "")}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-200">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
