import React from "react";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { useTranslations } from "next-intl";

export interface GoogleButtonProps {
  label: string;
  onClick?: () => void;
}

/**
 * Button for Google login in authentication forms.
 * @param {object} props - Component props
 * @param {() => void} [props.onClick] - Click handler for the button
 */
const GoogleButton: React.FC<GoogleButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      variant="soft"
      style={{ width: "100%", marginBottom: 16 }}
      onClick={onClick}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={24}
          height={24}
        />
        {label}
      </span>
    </Button>
  );
};

export default GoogleButton;
