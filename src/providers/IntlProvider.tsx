import { routing } from '@/i18n/routing';
import { type Locale } from '@/types/misc';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
  locale: string;
};

const IntlProvider: React.FC<React.PropsWithChildren<Props>> = async ({
  locale,
  children,
}) => {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlProvider;
