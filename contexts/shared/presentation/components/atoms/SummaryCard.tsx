import React from "react";

export interface SummaryCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

/**
 * SummaryCard muestra un título y un valor destacado, usado para resúmenes en dashboards.
 * @param {SummaryCardProps} props - Props para el label, valor y clase opcional para el valor.
 */
const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  valueClassName = "",
}) => (
  <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
    <p className="text-gray-600 text-base font-medium leading-normal">
      {label}
    </p>
    <p
      className={`tracking-tight text-3xl font-bold leading-tight ${valueClassName}`}
    >
      {value}
    </p>
  </div>
);

export default SummaryCard;
