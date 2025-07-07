import { FaChevronDown } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "@radix-ui/react-select";

export interface GroupFilterSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * GroupFilterSelect es un select estilizado para filtrar por grupo, usando Radix UI.
 * @param {GroupFilterSelectProps} props - Opciones, valor seleccionado y callback de cambio.
 */
const GroupFilterSelect: React.FC<GroupFilterSelectProps> = ({
  options,
  value,
  onChange,
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-64 appearance-none rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] flex items-center justify-between">
      <SelectValue />
      <SelectIcon className="ml-2 text-gray-700">
        <FaChevronDown />
      </SelectIcon>
    </SelectTrigger>
    <SelectPortal>
      <SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200 mt-1 z-50">
        <SelectViewport>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800 text-sm"
            >
              <SelectItemText>{opt.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </Select>
);

export default GroupFilterSelect;
