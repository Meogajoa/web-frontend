import { routing } from '@/i18n/routing';
import IntlProvider from '@/providers/IntlProvider';
import RootProvider from '@/providers/RootProvider';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }));
};

type Props = {
  params: Promise<{ locale: string }>;
};

const LocaleLayout: React.AFC<React.PropsWithChildren<Props>> = async ({
  params,
  children,
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <IntlProvider locale={locale}>
      <RootProvider>{children}</RootProvider>
    </IntlProvider>
  );
};

export default LocaleLayout;
