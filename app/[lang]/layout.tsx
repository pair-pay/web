// app/[lang]/layout.tsx
import { notFound } from 'next/navigation';
import I18nProvider from '@/contexts/shared/presentation/providers/I18nProvider';
import NavBar from '@/components/navbar5';

const locales = ['en', 'es'];

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!locales.includes(params.lang)) {
    notFound();
  }

  const messages = (await import(`@/locales/${params.lang}.json`)).default;

  return (
    <I18nProvider locale={params.lang} messages={messages}>
      <NavBar />
      <div className="flex flex-col min-h-screen p-4">{children}</div>
    </I18nProvider>
  );
}
