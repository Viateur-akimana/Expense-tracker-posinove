import React, { useState } from "react";
import { Expense } from "../types/expense";

type Props = {
  onAddExpense: (expense: Expense) => void;
};

const ExpenseForm: React.FC<Props> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date || !description) {
      alert("Please fill out all fields.");
      return;
    }

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount: Number(amount),
      category,
      date,
      description,
    };

    onAddExpense(newExpense);
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md">
      <div className="mb-2">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber || "")}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
