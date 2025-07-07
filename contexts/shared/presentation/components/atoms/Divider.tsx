import React from "react";
import { Flex, Box, Text } from "@radix-ui/themes";

/**
 * Visual divider with a label (default: 'or') for authentication forms.
 * @param {object} props - Component props
 * @param {string} [props.label='or'] - The label to display in the center
 */
const Divider: React.FC<{
  label?: string;
}> = ({ label = "or" }) => (
  <Flex align="center" style={{ margin: "16px 0" }}>
    <Box style={{ flex: 1, height: 1, background: "var(--gray-a4)" }} />
    <Text as="span" size="2" color="gray" style={{ margin: "0 12px" }}>
      {label}
    </Text>
    <Box style={{ flex: 1, height: 1, background: "var(--gray-a4)" }} />
  </Flex>
);

export default Divider;
