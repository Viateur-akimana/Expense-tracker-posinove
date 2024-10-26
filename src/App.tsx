import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"; // Your global styles
import ExpenseForm from "./components/ExpenseForm";
import { Expense } from "./types/expense";
import EditExpense from "./components/EditExpense";

const App: React.FC = () => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

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
                element={<Home />}
              />
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<ExpenseForm onAddExpense={function (expense: Expense): void {
                  throw new Error("Function not implemented.");
                } } editingExpense={null}/>}
              />
            }
          />
       <Route
            path="/edit/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<EditExpense expenses={[]} onUpdateExpense={function (expense: Expense): void {
                  throw new Error("Function not implemented.");
                } }/>}
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
