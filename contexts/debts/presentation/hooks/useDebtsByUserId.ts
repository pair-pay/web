import { useEffect, useState } from "react";
import { Debt } from "../../domain/debt";
import { DebtsApiRepository } from "../../infrastructure/api/debts-api.repository";
import { getAllDebts } from "../../application/use-cases/get-all-debts";
import { getDebtsByUserId } from "../../application/use-cases/get-debts-by-user-id";

/**
 * React hook to fetch and manage all expenses.
 * @param from - Optional start date to filter expenses
 * @param to - Optional end date to filter expenses
 * @returns Object containing expenses, loading and error states
 */
export function useDebtsByUserId(userId: string, from?: Date, to?: Date) {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const repo = new DebtsApiRepository();
    const fetchDebts = getDebtsByUserId(repo);

    console.log("Fetching expenses");

    setLoading(true);
    fetchDebts(userId, from, to)
      .then(setDebts)
      .catch((e) => {
        console.error("Error fetching expenses", e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [from, to]);

  return { debts, loading, error };
}
