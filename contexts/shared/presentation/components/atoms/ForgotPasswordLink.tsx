import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Link for the 'Forgot your password?' option in authentication forms.
 * @param {object} props - Component props
 * @param {string} [props.href="#"] - The href for the link
 */
const ForgotPasswordLink: React.FC<{
  href?: string;
}> = ({ href = "#" }) => {
  const t = useTranslations();
  return (
    <Link
      href={href}
      style={{
        color: "#2563eb",
        fontSize: 14,
        textDecoration: "underline",
      }}
    >
      {t("auth.login.forgotPassword")}
    </Link>
  );
};

export default ForgotPasswordLink;
