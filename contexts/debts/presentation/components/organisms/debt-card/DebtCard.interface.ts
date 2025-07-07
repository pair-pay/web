import { DebtStatus } from "@/contexts/debts/domain/constants/debt-status.constant";

/**
 * Props for the DebtCard component.
 * Based on DebtResponseDto from backend, plus currentUserId to determine the debt type.
 */
export interface DebtCardProps {
  /** Unique identifier for the debt */
  id: string;
  /** The user who owes the debt */
  from: string;
  /** The user who receives the debt */
  to: string;
  /** Amount owed */
  amount: number;
  /** Currency of the debt */
  currency: string;
  /** Status of the debt */
  status: DebtStatus;
  /** Creation date (ISO string) */
  createdAt: string;
}
