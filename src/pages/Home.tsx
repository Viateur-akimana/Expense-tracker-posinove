import React, { useEffect, useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types/expense';
import ExpenseForm from '../components/ExpenseForm';
import { sampleExpenses } from '../sampleExpenses';
import ExpenseChart from '../components/ExpenseChart';

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => (editingExpense ?
      prev.map(e => (e.id === editingExpense.id ? expense : e)) :
      [...prev, expense]
    ));
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
    <div>
      <nav>
        <h1 className='text-green-600'>Expense Tracker</h1>
        <p>Welcome, User</p>
      </nav>
      <ExpenseChart expenses={expenses} />
      <div className="max-w-md mx-auto p-4">
        <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        <p className="mt-4 text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Home;
