import React, { useEffect, useState } from 'react';
import ExpenseForm from './ExpenseForm'; // Adjust the import path as necessary
import { Expense } from '../types/expense';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  expenses: Expense[];
  onUpdateExpense: (expense: Expense) => void;
};

const EditExpense: React.FC<Props> = ({ expenses, onUpdateExpense }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    // Find the expense by ID
    const expenseToEdit = expenses.find(expense => expense.id === id);
    setEditingExpense(expenseToEdit || null);
  }, [expenses, id]);

  const handleUpdateExpense = (expense: Expense) => {
    onUpdateExpense(expense); // Call the parent function to update the expense
    navigate("/"); // Optionally navigate back to the home page after updating
  };

  if (!editingExpense) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold">Edit Expense</h2>
      <ExpenseForm onAddExpense={handleUpdateExpense} editingExpense={editingExpense} />
    </div>
  );
};

export default EditExpense;
