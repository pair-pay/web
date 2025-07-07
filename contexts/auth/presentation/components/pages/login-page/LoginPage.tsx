"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { LoginPageProps } from "./LoginPage.interface";
import LoginForm from "../../organisms/login-form/LoginForm";

const LoginPage = ({}: LoginPageProps) => {
  return <LoginForm />;
};

export default LoginPage;
