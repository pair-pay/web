import React from "react";
import { Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

/**
 * Checkbox for the 'Remember me' option in authentication forms.
 * @param {object} props - Component props
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Change handler for the checkbox
 * @param {string} [props.id="remember"] - The id for the checkbox
 */
const RememberMeCheckbox: React.FC<{
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}> = ({ checked, onChange, id = "remember" }) => {
  const t = useTranslations();
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ accentColor: "var(--accent-9)", marginRight: 6 }}
      />
      <Text as="label" htmlFor={id} style={{ cursor: "pointer" }}>
        {t("auth.login.remember")}
      </Text>
    </>
  );
};

export default RememberMeCheckbox;
