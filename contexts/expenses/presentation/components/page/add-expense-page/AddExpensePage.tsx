"use client";
import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import AddExpense from "../../organisms/add-expense/AddExpense";
import { useExpensesSplitTypes } from "@/contexts/expenses/presentation/hooks/useExpensesSplitTypes";

const AddExpensePage = () => {
  const t = useTranslations();

  const { splitTypes, loading, error } = useExpensesSplitTypes();

  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
    },
  ];

  const mockCurrencies = [
    {
      id: "1",
      name: "USD",
    },
  ];

  const mockGroups = [
    {
      id: "1",
      name: "Group 1",
    },
  ];

  return (
    <Flex
      direction="column"
      gap="4"
      align="center"
      justify="center"
      style={{ width: "100%" }}
    >
      <Heading weight="bold" as="h1">
        {t("expenses.add.title")}
      </Heading>
      <AddExpense
        onSubmit={() => {}}
        splitTypes={splitTypes}
        users={mockUsers}
        currencies={mockCurrencies}
        groups={mockGroups}
      />
    </Flex>
  );
};

export default AddExpensePage;
