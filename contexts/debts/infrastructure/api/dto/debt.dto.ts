export interface DebtDTO {
  id: string;
  expenseId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
