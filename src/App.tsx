import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { Expense } from "./types/expense";
import AddNewExpense from "./pages/AddNewExpense";
import EditExpense from "./components/EditExpense";

const App: React.FC = () => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const handleAddExpense = (newExpense: Expense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };
  const handleUpdateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };


  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<Home expenses={expenses} onDeleteExpense={handleDeleteExpense} onAddExpense={handleAddExpense} />}
              />
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<AddNewExpense onAddExpense={handleAddExpense} />}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<EditExpense expenses={expenses} onUpdateExpense={handleUpdateExpense} />}
              />
            }
          />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
