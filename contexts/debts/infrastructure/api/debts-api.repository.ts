import { Expense } from "@/contexts/expenses/domain/expense";
import { DebtsRepository } from "../../application/ports/debts.repository";
import { Debt } from "../../domain/debt";
import { DebtDTO } from "./dto/debt.dto";

/**
 * Implementation of ExpensesRepository using a REST API.
 */
export class DebtsApiRepository implements DebtsRepository {
  async findAll(from?: Date, to?: Date): Promise<Debt[]> {
    let url = `/api/debts`;
    const params: string[] = [];
    if (from) params.push(`from=${from.toISOString()}`);
    if (to) params.push(`to=${to.toISOString()}`);
    if (params.length) url += "?" + params.join("&");

    const response = await fetch(url);
    const data: DebtDTO[] = await response.json();

    console.log(
      "Data received from API in front",
      JSON.stringify(data, null, 2)
    );

    return data.map((item: DebtDTO) =>
      Debt.fromPrimitives({
        id: item.id,
        expenseId: item.expenseId,
        fromUserId: item.fromUserId,
        toUserId: item.toUserId,
        amount: item.amount,
        currency: item.currency,
        status: item.status,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      })
    );
  }

  findById(id: string): Promise<Debt | null> {
    throw new Error("Method not implemented.");
  }
  async findByExpenseId(
    expenseId: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Debt[]> {
    let url = `/api/debts/expense/${expenseId}`;
    const params: string[] = [];
    if (fromDate) params.push(`from=${fromDate.toISOString()}`);
    if (toDate) params.push(`to=${toDate.toISOString()}`);
    if (params.length) url += "?" + params.join("&");

    const response = await fetch(url);
    const data: DebtDTO[] = await response.json();

    return data.map((item: DebtDTO) =>
      Debt.fromPrimitives({
        id: item.id,
        expenseId: item.expenseId,
        fromUserId: item.fromUserId,
        toUserId: item.toUserId,
        amount: item.amount,
        currency: item.currency,
        status: item.status,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      })
    );
  }
  async findByUserId(
    userId: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Debt[]> {
    let url = `/api/debts/user/${userId}`;
    const params: string[] = [];
    if (fromDate) params.push(`from=${fromDate.toISOString()}`);
    if (toDate) params.push(`to=${toDate.toISOString()}`);
    if (params.length) url += "?" + params.join("&");

    const response = await fetch(url);
    const data: DebtDTO[] = await response.json();

    return data.map((item: DebtDTO) =>
      Debt.fromPrimitives({
        id: item.id,
        expenseId: item.expenseId,
        fromUserId: item.fromUserId,
        toUserId: item.toUserId,
        amount: item.amount,
        currency: item.currency,
        status: item.status,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      })
    );
  }
  findByExpenseIdAndUserId(
    expenseId: string,
    userId: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Debt | null> {
    throw new Error("Method not implemented.");
  }
  findByExpenseIdAndUserIdAndStatus(
    expenseId: string,
    userId: string,
    status: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Debt[]> {
    throw new Error("Method not implemented.");
  }
  async findAllSplitTypes(): Promise<string[]> {
    let url = `/api/debts/split-types`;
    const response = await fetch(url);
    const data: string[] = await response.json();
    return data;
  }
  create(debt: Debt): Promise<Debt> {
    throw new Error("Method not implemented.");
  }
  update(debt: Debt): Promise<Debt> {
    throw new Error("Method not implemented.");
  }
  delete(debt: Debt): Promise<Debt> {
    throw new Error("Method not implemented.");
  }
}
