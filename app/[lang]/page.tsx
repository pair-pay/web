"use client";
import { useTranslations } from "next-intl";
import { use } from "react";
import AuthTestComponent from "@/contexts/auth/presentation/components/auth-test-component/AuthTestComponent";
import LoginForm from "@/contexts/auth/presentation/components/organisms/login-form/LoginForm";

export default function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const t = useTranslations("common");

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>Idioma actual: {lang}</p>
    </div>
  );
}
