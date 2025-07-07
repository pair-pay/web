export interface AddExpenseProps {
  users: {
    id: string;
    name: string;
  }[];
  currencies: {
    id: string;
    name: string;
  }[];
  groups: {
    id: string;
    name: string;
  }[];
  onSubmit: () => void;
  splitTypes: string[];
}
