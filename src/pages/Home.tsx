import React, { useEffect, useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types/expense';
import { sampleExpenses } from '../sampleExpenses';
import ExpenseChart from '../components/ExpenseChart';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Load and save expenses in localStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) =>
      editingExpense
        ? prev.map((e) => (e.id === editingExpense.id ? expense : e))
        : [...prev, expense]
    );
    setEditingExpense(null);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const editExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg p-4 flex justify-between items-center px-4 md:px-20">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-wide">Expense Tracker</h1>
        <p className="text-gray-600">Welcome, User 👋</p>
      </nav>

      {/* Chart Section */}
      <div className="p-4">
        <ExpenseChart expenses={expenses} />
      </div>

      {/* Separator Line */}
      <hr className="my-6 border-gray-300" />

      {/* Expense List & Form Section */}
      <div className="mx-auto p-4 max-w-4xl">
        <div className="mt-6">
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />

          <p className="mt-4 text-xl font-semibold text-center">
            Total: <span className="text-green-700">${totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
