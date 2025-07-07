import React from "react";
import GoogleButton from "./GoogleButton";
import { useTranslations } from "next-intl";
import { Flex } from "@radix-ui/themes";

/**
 * Group of social login buttons (Google, Facebook, Apple, etc.).
 * Prepared for multiple providers, currently only renders Google.
 * @param {object} props - Component props
 * @param {Array<{ name: string; onClick?: () => void }>} [props.providers] - List of providers to render
 */
const SocialLoginButtons: React.FC<{
  providers?: Array<{
    name: string;
    onClick?: () => void;
  }>;
  onClick?: () => void;
}> = ({ providers, onClick }) => {
  const t = useTranslations();
  // In the future, add more providers here
  if (!providers) {
    // Default: only Google
    return <GoogleButton label={t("auth.common.google")} onClick={onClick} />;
  }
  return (
    <Flex direction="column" gap="2">
      {providers.map((provider) => {
        if (provider.name === "google") {
          return (
            <GoogleButton
              key={provider.name}
              label={t("auth.common.google")}
              onClick={provider.onClick}
            />
          );
        }
        // Aquí se pueden añadir más proveedores en el futuro
        return null;
      })}
    </Flex>
  );
};

export default SocialLoginButtons;
