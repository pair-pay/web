import { Expense } from "../../domain/expense";

export interface ExpensesRepository {
  findAll(from?: Date, to?: Date): Promise<Expense[]>;
  // findById(id: string): Promise<Expense>;
  // findByUserId(userId: string, from?: Date, to?: Date): Promise<Expense[]>;
  // findByGroupId(groupId: string, from?: Date, to?: Date): Promise<Expense[]>;
  findAllSplitTypes(): Promise<string[]>;
  // create(expense: Expense): Promise<Expense>;
  // update(expense: Expense): Promise<Expense>;
  // delete(id: string): Promise<Expense>;
}
