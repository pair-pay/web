import { useEffect, useState } from "react";
import { Expense } from "../../domain/expense";
import { ExpensesApiRepository } from "../../infrastructure/api/expenses-api.repository";
import { getAllExpenses } from "../../application/use-cases/get-all-expenses";

/**
 * React hook to fetch and manage all expenses.
 * @param from - Optional start date to filter expenses
 * @param to - Optional end date to filter expenses
 * @returns Object containing expenses, loading and error states
 */
export function useExpenses(from?: Date, to?: Date) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const repo = new ExpensesApiRepository();
    const fetchExpenses = getAllExpenses(repo);

    console.log("Fetching expenses");

    setLoading(true);
    fetchExpenses(from, to)
      .then(setExpenses)
      .catch((e) => {
        console.error("Error fetching expenses", e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [from, to]);

  return { expenses, loading, error };
}
