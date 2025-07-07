"use client";

import {
  FaAt,
  FaCalendar,
  FaChevronDown,
  FaChevronUp,
  FaComment,
  FaDollarSign,
  FaEuroSign,
  FaMoneyBills,
  FaUser,
  FaUserGroup,
} from "react-icons/fa6";

import React, { useState } from "react";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { AddExpenseProps } from "./AddExpense.interface";
import { useTranslations } from "next-intl";
import FormField from "@/contexts/shared/presentation/components/atoms/TextField";
import { Form, Submit } from "@radix-ui/react-form";
import { Selector } from "@/contexts/shared/presentation/components/atoms/selector/Selector";

const AddExpense = ({
  onSubmit,
  splitTypes,
  users,
  currencies,
  groups,
}: AddExpenseProps) => {
  const t = useTranslations();

  const [splitType, setSplitType] = useState<string>(splitTypes[0]);

  return (
    <Flex direction="column" gap="4" align="center">
      <Form onSubmit={onSubmit}>
        <Flex direction="column" gap="4">
          {/* Name */}
          <FormField
            name="name"
            placeholder={t("expenses.add.name")}
            type="text"
            value=""
            required
            label={t("expenses.add.name")}
            icon={<FaAt />}
            onChange={() => {}}
          />
          {/* Description */}
          <FormField
            name="description"
            placeholder={t("expenses.add.description")}
            type="text"
            value=""
            required
            label={t("expenses.add.description")}
            icon={<FaComment />}
            onChange={() => {}}
          />
          <Flex direction="row" gap="4" align="center" justify="between">
            {/* Amount */}
            <Flex direction="column" style={{ flex: 1 }}>
              <FormField
                name="amount"
                placeholder={t("expenses.add.amount")}
                type="number"
                value=""
                required
                label={t("expenses.add.amount")}
                icon={<FaDollarSign />}
                onChange={() => {}}
              />
            </Flex>
            {/* Currency */}
            <Flex direction="column" style={{ flex: 1 }}>
              <Selector
                name="currency"
                placeholder={t("expenses.add.currency")}
                options={currencies.map((currency) => ({
                  value: currency.id,
                  label: currency.name,
                }))}
                value={currencies[0].id}
                onValueChange={() => {}}
                label={t("expenses.add.currency")}
                triggerStyle={{ width: "100%" }}
              />
            </Flex>
          </Flex>
          <Flex direction="row" gap="4" align="center" justify="between">
            {/* Paid By User Id */}
            <Flex direction="column" style={{ flex: 1 }}>
              <Selector
                name="paidByUser"
                placeholder={t("expenses.add.paidByUser")}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                value={users[0].id}
                onValueChange={() => {}}
                label={t("expenses.add.paidByUser")}
                triggerStyle={{ width: "100%" }}
              />
            </Flex>
            <Flex direction="column" style={{ flex: 1 }}>
              {/* Date */}
              <FormField
                name="date"
                placeholder={t("expenses.add.date")}
                type="date"
                value=""
                required
                label={t("expenses.add.date")}
                icon={<FaCalendar />}
                onChange={() => {}}
              />
            </Flex>
          </Flex>
          <Flex direction="row" gap="4" align="center" justify="between">
            <Flex direction="column" style={{ flex: 1 }}>
              <Selector
                name="group"
                placeholder={t("expenses.add.group")}
                options={groups.map((group) => ({
                  value: group.id,
                  label: group.name,
                }))}
                value={groups[0].id}
                onValueChange={() => {}}
                label={t("expenses.add.group")}
                triggerStyle={{ width: "100%" }}
              />
            </Flex>
            <Flex direction="column" style={{ flex: 1 }}>
              <Selector
                name="splitType"
                label={t("expenses.add.splitType")}
                placeholder={t("expenses.add.splitType")}
                options={splitTypes.map((splitType) => ({
                  value: splitType,
                  label: splitType,
                }))}
                value={splitType}
                onValueChange={(value) => setSplitType(value)}
                triggerStyle={{ width: "100%" }}
              />
            </Flex>
          </Flex>
          {/* Group Id */}
          <Button onClick={() => onSubmit()}>{t("common.add")}</Button>
        </Flex>
      </Form>
    </Flex>
  );
};
// public readonly name: string,
// public readonly amount: number,
// public readonly currency: string,
// public readonly description: string,
// public readonly date: Date,
// public readonly paidByUserId: string,
// public readonly groupId: string,
// public readonly splitType: string,
export default AddExpense;
