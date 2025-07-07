import { ExpensesRepository } from "../ports/expenses.repository";

export function getSplitTypes(expensesRepository: ExpensesRepository) {
  return async (): Promise<string[]> => {
    return expensesRepository.findAllSplitTypes();
  };
}
