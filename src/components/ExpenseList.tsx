import React, { useState } from "react";
import { Expense } from "../types/expense";

type Props = {
  expenses: Expense[];
};

const ExpenseList: React.FC<Props> = ({ expenses }) => {
  const [filter, setFilter] = useState("");

  const filteredExpenses = expenses.filter((expense) =>
    filter ? expense.category === filter : true
  );

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Filter by category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <ul>
        {filteredExpenses.map((expense) => (
          <li key={expense.id} className="p-2 border-b">
            <p><strong>{expense.category}</strong> - ${expense.amount}</p>
            <p>{expense.description}</p>
            <p>{expense.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
