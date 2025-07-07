import React from "react";
import { Box } from "@radix-ui/themes";

/**
 * Error message box for authentication forms.
 * @param {object} props - Component props
 * @param {string} props.message - The error message to display
 */
const ErrorMessage: React.FC<{
  message: string;
}> = ({ message }) => (
  <Box style={{ color: "red", marginBottom: 8, fontSize: 14 }}>{message}</Box>
);

export default ErrorMessage;
