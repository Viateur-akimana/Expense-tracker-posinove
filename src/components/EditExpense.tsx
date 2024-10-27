import React, { useEffect, useState } from 'react';
import { Expense } from '../types/expense';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  expenses: Expense[];
  onUpdateExpense: (expense: Expense) => void;
};

const EditExpense: React.FC<Props> = ({ expenses, onUpdateExpense }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const expenseToEdit = expenses.find(expense => expense.id === id);
    if (expenseToEdit) {
      setEditingExpense(expenseToEdit);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
      setDescription(expenseToEdit.description);
    }
  }, [expenses, id]);

  if (!editingExpense) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Expense not found. Please check the ID or try again.</p>
      </div>
    );
  }


  const handleUpdateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount === "" || isNaN(Number(amount)) || !category || !date || !description) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const updatedExpense: Expense = {
      id: editingExpense?.id || '',
      amount: Number(amount),
      category,
      date,
      description,
    };

    onUpdateExpense(updatedExpense);
    navigate('/');
  };


  return (
    <>
      <Navbar />
      <form onSubmit={handleUpdateExpense} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Expense</h2>
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
            {category ? (
              <option value={category} disabled>{category}</option>
            ) : (
              <option value="" disabled>Select Category</option>
            )}
            <option value="Food & Dining">Food & Dining</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Utilities">Utilities</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Other">Other</option>
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
          Update Expense
        </button>
      </form>
      <Footer />
    </>
  );
};

export default EditExpense;
