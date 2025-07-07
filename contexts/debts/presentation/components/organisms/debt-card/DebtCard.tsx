"use client";
import * as React from "react";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { DebtCardProps } from "./DebtCard.interface";
import { DebtStatus } from "@/contexts/debts/domain/constants/debt-status.constant";
import { grass } from "@radix-ui/colors";

/**
 * DebtCard component displays information about a debt between two users.
 * Shows who owes, who receives, the amount, type (le debes/te deben), and date.
 *
 * @param props - DebtCardProps
 */
const DebtCard: React.FC<DebtCardProps> = ({
  id,
  from,
  to,
  amount,
  currency,
  status,
  createdAt,
}) => {
  return (
    <Card
      key={id}
      variant={status === DebtStatus.PENDING ? "classic" : "surface"}
      style={{
        border: `1px solid ${grass.grass9}`,
      }}
    >
      <Flex justify="between" align="center" gap="2">
        <Text size="2" weight="bold">
          {from}
        </Text>
        <Text size="2" weight="bold">
          {amount} {currency}
        </Text>
      </Flex>
      <Flex justify="between" align="center" gap="2">
        <Text size="1" color="gray">
          De:{" "}
          <Text size="1" weight="bold">
            {from}
          </Text>
        </Text>
        <Text size="1" color="gray">
          Para:{" "}
          <Text size="1" weight="bold">
            {to}
          </Text>
        </Text>
      </Flex>
      <Flex justify="between" align="center" gap="2" direction="column">
        <Text size="1" color="gray">
          Fecha: {new Date(createdAt).toLocaleDateString()}
        </Text>
      </Flex>
    </Card>
  );
};

export default DebtCard;
