import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { Expense } from '../types/expense';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

type Props = {
  onAddExpense: (expense: Expense) => void;
};

const AddNewExpense: React.FC<Props> = ({ onAddExpense }) => {
  const navigate = useNavigate();

  const handleAddExpense = (newExpense: Expense) => {
    onAddExpense(newExpense);
    console.log('New Expense Added:', newExpense);
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <main className="mt-8">
        <ExpenseForm onAddExpense={handleAddExpense} />
      </main>
    </div>
  );
};

export default AddNewExpense;
