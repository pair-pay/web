import React from "react";
import { Field, Label } from "@radix-ui/react-form";
import { Flex, TextField as TextFieldTheme } from "@radix-ui/themes";
import { FaEnvelope } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import ErrorMessage from "./ErrorMessage";

/**
 * Controlled email input field for authentication forms.
 * @param {object} props - Component props
 * @param {string} props.value - The current value of the email input
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Change handler for the input
 * @param {boolean} [props.required=true] - Whether the field is required
 * @param {string} [props.error] - Error message to display
 */
const FormField: React.FC<{
  name: string;
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  type:
    | "number"
    | "text"
    | "search"
    | "time"
    | "hidden"
    | "email"
    | "date"
    | "datetime-local"
    | "month"
    | "password"
    | "tel"
    | "url"
    | "week"
    | undefined;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
}> = ({
  name,
  label,
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  required = true,
  autoComplete,
}) => {
  return (
    <Field name={name}>
      <Flex direction="column" gap="2">
        <Label htmlFor={name}>{label}</Label>

        <TextFieldTheme.Root
          id={name}
          placeholder={placeholder}
          required={required}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
        >
          <TextFieldTheme.Slot>{icon}</TextFieldTheme.Slot>
        </TextFieldTheme.Root>
      </Flex>
    </Field>
  );
};

export default FormField;
