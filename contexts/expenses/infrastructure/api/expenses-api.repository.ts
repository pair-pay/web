import { ExpensesRepository } from "../../application/ports/expenses.repository";
import { Expense } from "../../domain/expense";
import { ExpenseDTO } from "./dto/expense.dto";

/**
 * Implementation of ExpensesRepository using a REST API.
 */
export class ExpensesApiRepository implements ExpensesRepository {
  async findAll(from?: Date, to?: Date): Promise<Expense[]> {
    let url = `/api/expenses`;
    const params: string[] = [];
    if (from) params.push(`from=${from.toISOString()}`);
    if (to) params.push(`to=${to.toISOString()}`);
    if (params.length) url += "?" + params.join("&");

    const response = await fetch(url);
    const data: ExpenseDTO[] = await response.json();

    console.log(
      "Data received from API in front",
      JSON.stringify(data, null, 2)
    );

    return data.map((item: ExpenseDTO) =>
      Expense.fromPrimitives({
        id: item.id,
        name: item.name,
        amount: item.amount,
        currency: item.currency,
        description: item.description,
        date: new Date(item.date),
        paidByUserId: item.paidByUserId,
        groupId: item.groupId,
        splitType: item.splitType,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      })
    );
  }
  async findAllSplitTypes(): Promise<string[]> {
    let url = `/api/expenses/split-types`;
    const response = await fetch(url);
    const data: string[] = await response.json();
    return data;
  }
}
