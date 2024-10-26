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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading...</div> {/* Handle loading state */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Expense</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ExpenseForm 
          onAddExpense={handleUpdateExpense} 
          editingExpense={editingExpense} 
        />
      </div>
      <div className="text-center mt-4">
        <button 
          onClick={() => navigate("/")} 
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditExpense;
