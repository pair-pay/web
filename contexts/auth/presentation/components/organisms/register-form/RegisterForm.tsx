"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Form, Submit } from "@radix-ui/react-form";
import { Box, Button, Flex, Heading, Link, Text } from "@radix-ui/themes";
import ErrorMessage from "@/contexts/shared/presentation/components/atoms/ErrorMessage";
import Divider from "@/contexts/shared/presentation/components/atoms/Divider";
import SocialLoginButtons from "@/contexts/shared/presentation/components/molecules/SocialLoginButtons";
import { z } from "zod";
import { useAuth } from "@/contexts/auth/presentation/hooks/useAuth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import FormField from "@/contexts/shared/presentation/components/atoms/TextField";

/**
 * Register form component for user registration using Radix UI.
 * Reuses atomic and molecular components.
 */
const RegisterForm: React.FC = () => {
  const t = useTranslations();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const PASSWORD_MIN = 12;
  const passwordMinMsg = t("auth.validation.passwordMin");

  // Zod schema
  const schema = z
    .object({
      email: z
        .string()
        .min(1, t("auth.validation.required"))
        .email(t("auth.validation.invalidEmail")),
      password: z.string().min(PASSWORD_MIN, passwordMinMsg),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.register.passwordsDontMatch"),
      path: ["confirmPassword"],
    });

  const { registerByEmail } = useAuth();
  const router = useRouter();

  /**
   * Handles the register form submission.
   * @param e React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    const result = schema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      const errors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
      } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") errors.email = err.message;
        if (err.path[0] === "password") errors.password = err.message;
        if (err.path[0] === "confirmPassword")
          errors.confirmPassword = err.message;
      });
      setFieldErrors(errors);
      return;
    }
    setLoading(true);

    console.log("registerByEmail", email, password);
    // Registro usando el dominio
    const regResult = await registerByEmail(email, password);
    if (!regResult.success) {
      setError(regResult.message || "Registration failed");
      setLoading(false);
      return;
    }
    // Login automático tras registro
    const loginResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (loginResult?.ok) {
      router.push("/"); // Cambia la ruta si lo necesitas
    } else {
      setError(loginResult?.error || "Login after registration failed");
    }
    setLoading(false);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Box
        style={{
          maxWidth: 512,
          width: "100%",
          background: "var(--color-panel-solid)",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          padding: 32,
          border: "1px solid var(--color-panel-border)",
        }}
      >
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="4">
            <Text as="span" size="3" color="gray">
              {t("auth.register.subtitle")}
            </Text>
            <Heading as="h1" size="6">
              {t("auth.register.title")}
            </Heading>
          </Flex>
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Flex direction="column" gap="3">
              <FormField
                name="email"
                label={t("auth.common.email")}
                icon={<FaEnvelope />}
                placeholder={t("auth.common.email")}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormField
                name="password"
                label={t("auth.common.password")}
                icon={<FaLock />}
                placeholder={t("auth.common.password")}
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormField
                name="confirmPassword"
                label={t("auth.register.confirmPassword")}
                icon={<FaLock />}
                placeholder={t("auth.register.confirmPassword")}
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <ErrorMessage message={error} />}
              <Submit asChild>
                <Button
                  name="register"
                  disabled={loading}
                  style={{ width: "100%", marginBottom: 12 }}
                >
                  {loading ? t("common.loading") : t("auth.register.title")}
                </Button>
              </Submit>
            </Flex>
          </Form>
          <Divider />
          <SocialLoginButtons onClick={() => {}} />
          <Flex align="center" justify="center">
            <Flex align="center" justify="center">
              <Text as="span" size="2" color="gray">
                {t("auth.register.alreadyHaveAccount")}
              </Text>
              <Link
                href="/auth/login"
                style={{
                  color: "#2563eb",
                  marginLeft: 6,
                  fontSize: 14,
                  textDecoration: "underline",
                }}
              >
                {t("auth.login.title")}
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
