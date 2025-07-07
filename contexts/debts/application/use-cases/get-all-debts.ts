import { DebtsRepository } from "../ports/debts.repository";
import { Debt } from "../../domain/debt";

export function getAllDebts(debtsRepository: DebtsRepository) {
  return async (from?: Date, to?: Date): Promise<Debt[]> => {
    return debtsRepository.findAll(from, to);
  };
}
