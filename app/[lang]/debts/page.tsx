import DebtCard from "@/contexts/debts/presentation/components/organisms/debt-card/DebtCard";
import { DebtStatus } from "@/contexts/debts/domain/constants/debt-status.constant";

export default function Debts() {
  return (
    <DebtCard
      id="1"
      from="Usuario 1"
      to="Usuario 2"
      amount={100}
      currency="USD"
      status={DebtStatus.PENDING}
      createdAt="2021-01-01"
    />
  );
}
