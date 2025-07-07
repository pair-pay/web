import * as React from "react";
import { Flex, Select } from "@radix-ui/themes";
import { Field, Label } from "@radix-ui/react-form";

/**
 * Selector component using Radix Theme Select.
 *
 * @param {Object} props
 * @param {Array<{ value: string; label: string; disabled?: boolean }>} props.options - Options to display in the selector
 * @param {string} [props.value] - Selected value
 * @param {(value: string) => void} [props.onValueChange] - Callback when value changes
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.name] - Name for form integration
 * @param {boolean} [props.disabled] - Whether the selector is disabled
 * @param {boolean} [props.required] - Whether the selector is required
 * @param {React.CSSProperties} [props.triggerStyle] - Inline style for the Select.Trigger
 * @returns {React.ReactElement}
 */
export function Selector({
  label,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  name,
  disabled = false,
  required = false,
  triggerStyle,
}: {
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  triggerStyle?: React.CSSProperties;
}): React.ReactElement {
  return (
    <Field name={name} style={{ width: "100%", minWidth: "100px" }}>
      <Flex direction="column" gap="2">
        <Label htmlFor={name}>{label}</Label>
        <Select.Root
          value={value}
          onValueChange={onValueChange}
          name={name}
          disabled={disabled}
          required={required}
        >
          <Select.Trigger placeholder={placeholder} style={triggerStyle} />
          <Select.Content>
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </Field>
  );
}

export default Selector;
