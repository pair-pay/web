"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Field, Form, Label, Submit } from "@radix-ui/react-form";
import { Box, Button, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import Image from "next/image";
import { useIsMobile } from "@/contexts/shared/presentation/hooks/isMobile";
import RememberMeCheckbox from "@/contexts/shared/presentation/components/atoms/RememberMeCheckbox";
import ForgotPasswordLink from "@/contexts/shared/presentation/components/atoms/ForgotPasswordLink";
import ErrorMessage from "@/contexts/shared/presentation/components/atoms/ErrorMessage";
import Divider from "@/contexts/shared/presentation/components/atoms/Divider";
import SocialLoginButtons from "@/contexts/shared/presentation/components/molecules/SocialLoginButtons";
import { useRouter } from "next/navigation";
import FormField from "@/contexts/shared/presentation/components/atoms/TextField";

/**
 * Login form component for user authentication using Radix UI.
 */
const LoginForm: React.FC = () => {
  const t = useTranslations();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isMobile = useIsMobile();
  const router = useRouter();
  /**
   * Handles the login form submission.
   * @param e React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      console.log(result.error);
      setError(result.error);
    } else if (!result?.ok) {
      setError("Unknown error occurred.");
    }

    console.log(result);

    setLoading(false);
    router.push("/");
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
          ...(isMobile ? { height: "100%" } : {}),
        }}
      >
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="4">
            <Text as="span" size="3" color="gray">
              {t("auth.login.subtitle")}
            </Text>
            <Heading as="h1" size="6">
              {t("auth.login.title")}
            </Heading>
          </Flex>
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Flex direction="column" gap="3">
              <FormField
                name="email"
                label={t("auth.common.email")}
                icon={<FaEnvelope />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <FormField
                name="password"
                label={t("auth.common.password")}
                icon={<FaLock />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <Flex
                align="center"
                justify="between"
                style={{ marginTop: 4, marginBottom: 8 }}
              >
                <Flex align="center" gap="1">
                  <RememberMeCheckbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </Flex>
                <ForgotPasswordLink />
              </Flex>
              {error && <ErrorMessage message={error} />}
              <Submit asChild>
                <Button
                  name="login"
                  disabled={loading}
                  style={{ width: "100%", marginBottom: 12 }}
                >
                  {loading ? t("common.loading") : t("auth.login.title")}
                </Button>
              </Submit>
            </Flex>
          </Form>
          <Divider />
          <SocialLoginButtons />
          <Flex align="center" justify="center">
            <Text as="span" size="2" color="gray">
              {t("auth.login.noAccount")}
            </Text>
            <Link
              href="/auth/register"
              style={{
                color: "#2563eb",
                marginLeft: 6,
                fontSize: 14,
                textDecoration: "underline",
              }}
            >
              {t("auth.register.title")}
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginForm;
