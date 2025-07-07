"use client";

import React from "react";
import { useExpenses } from "../hooks/useExpenses";
import { Expense } from "../../domain/expense";
import { Avatar, Box, Flex, Card, Text } from "@radix-ui/themes";

const ExpenseList = () => {
  const { expenses, loading, error } = useExpenses();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Flex direction="column" gap="4">
      <Text as="div" size="4" weight="bold" id="expenses-list-title">
        Expenses
      </Text>
      {expenses.map((expense: Expense) => (
        <Card key={expense.id} id={`card-${expense.id}`}>
          <Flex direction="column" gap="4">
            <Flex id={`card-${expense.id}-header`} gap="3" align="center">
              <Text
                as="div"
                size="3"
                weight="bold"
                id={`card-${expense.id}-name`}
              >
                {expense.name.value}
              </Text>
            </Flex>
            <Flex id={`card-${expense.id}-body`} gap="3" align="center">
              <Text
                as="div"
                size="2"
                color="gray"
                id={`card-${expense.id}-amount`}
              >
                {expense.amount.value}
              </Text>
              <Text
                as="div"
                size="2"
                color="gray"
                id={`card-${expense.id}-description`}
              >
                {expense.description}
              </Text>
            </Flex>
            <Flex id={`card-${expense.id}-footer`} gap="3" justify="between">
              <Text
                as="div"
                size="2"
                color="gray"
                id={`card-${expense.id}-split-type`}
              >
                {`Split Type: ${expense.splitType.value}`}
              </Text>
              <Text
                as="div"
                size="2"
                color="gray"
                id={`card-${expense.id}-date`}
              >
                {expense.date.toLocaleDateString()}
              </Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default ExpenseList;
