import { useQuery } from "@tanstack/react-query";
import { Expense } from "../../domain/expense";
import { ExpensesApiRepository } from "../../infrastructure/api/expenses-api.repository";
import { getAllExpenses } from "../../application/use-cases/get-all-expenses";
import { getSplitTypes } from "../../application/use-cases/get-split-types";

/**
 * React hook to fetch and manage all split types using React Query.
 * @returns Object containing splitTypes, loading and error states
 */
export function useExpensesSplitTypes() {
  const repo = new ExpensesApiRepository();

  const {
    data: splitTypes = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["expenses", "splitTypes"],
    queryFn: () => getSplitTypes(repo)(),
    staleTime: 1000 * 60 * 5, // 5 minutos, ajusta según necesidad
  });

  return { splitTypes, loading, error: error?.message ?? null };
}
