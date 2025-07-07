import { ExpensesRepository } from "../ports/expenses.repository";
import { Expense } from "../../domain/expense";

export function getAllExpenses(expensesRepository: ExpensesRepository) {
  return async (from?: Date, to?: Date): Promise<Expense[]> => {
    return expensesRepository.findAll(from, to);
  };
}
