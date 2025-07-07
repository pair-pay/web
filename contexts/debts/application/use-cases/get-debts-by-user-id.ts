import { DebtsRepository } from "../ports/debts.repository";
import { Debt } from "../../domain/debt";

export function getDebtsByUserId(debtsRepository: DebtsRepository) {
  return async (userId: string, from?: Date, to?: Date): Promise<Debt[]> => {
    return debtsRepository.findByUserId(userId, from, to);
  };
}
