import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export interface FilterSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * FilterSelect is a select styled for filtering, using Radix UI.
 * @param {FilterSelectProps} props - Options, selected value and change callback.
 */
const FilterSelect: React.FC<FilterSelectProps> = ({
  options,
  value,
  onChange,
}) => (
  <Select.Root value={value} onValueChange={onChange}>
    <Select.Trigger className="w-64 appearance-none rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] flex items-center justify-between">
      <Select.Value />
      <Select.Icon className="ml-2 text-gray-700">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="bg-white rounded-lg shadow-lg border border-gray-200 mt-1 z-50">
        <Select.Viewport>
          {options.map((opt) => (
            <Select.Item
              key={opt.value}
              value={opt.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800 text-sm"
            >
              <Select.ItemText>{opt.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default FilterSelect;
