export interface ExpenseDTO {
  id: string;
  name: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  paidByUserId: string;
  groupId: string;
  splitType: string;
  createdAt: string;
  updatedAt: string;
}
