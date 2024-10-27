import React from 'react';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types/expense';
import ExpenseChart from '../components/ExpenseChart';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

type Props = {
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
};

const Home: React.FC<Props> = ({ expenses, onDeleteExpense }) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100">

      <Navbar />


      <div className="p-4">
        <ExpenseChart expenses={expenses} />
      </div>

      <hr className="my-6 border-gray-300" />
      <div className="mx-auto p-4 max-w-4xl">
        <div className="mt-6">
          <ExpenseList expenses={expenses} onDeleteExpense={onDeleteExpense} />
          <p className="mt-4 text-xl font-semibold text-center">
            Total: <span className="text-green-700">${totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
