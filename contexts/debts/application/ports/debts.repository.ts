import { Debt } from "../../domain/debt";

export interface DebtsRepository {
  findAll(from?: Date, to?: Date): Promise<Debt[]>;
  findAll(fromDate?: Date, toDate?: Date): Promise<Debt[]>;
  findById(id: string): Promise<Debt | null>;
  findByExpenseId(
    expenseId: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Debt[]>;
  findByUserId(userId: string, fromDate?: Date, toDate?: Date): Promise<Debt[]>;
  findByExpenseIdAndUserId(
    expenseId: string,
    userId: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Debt | null>;
  findByExpenseIdAndUserIdAndStatus(
    expenseId: string,
    userId: string,
    status: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Debt[]>;
  create(debt: Debt): Promise<Debt>;
  update(debt: Debt): Promise<Debt>;
  delete(debt: Debt): Promise<Debt>;
}
