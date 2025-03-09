import { expect, Page } from '@playwright/test';
import { homeUrl, signInUrl, signUpUrl } from '@tests/constants/urls';
import { TestAccount } from '@tests/types/auth';

export const generateRandomAccount = (): TestAccount => {
  return {
    email: `test${Math.random()}@test.com`,
    password: 'test',
    passwordConfirmation: 'test',
    nickname: `test${Math.random()}`,
  };
};

export const signUpAsync = async (
  page: Page,
  {
    account,
    shouldSuccess,
  }: {
    account: TestAccount;
    shouldSuccess: boolean;
  },
) => {
  // GIVEN
  await page.goto(signUpUrl);

  // WHEN
  await page.getByTestId('email-label').fill(account.email);
  await page.getByTestId('password-label').fill(account.password);
  await page.getByTestId('password-confirmation-label').fill(account.password);
  await page.getByTestId('nickname-label').fill(account.nickname);
  await page.getByTestId('sign-up-button').click();

  // THEN
  if (shouldSuccess) {
    await expect(page).toHaveURL(signInUrl);
  } else {
    await expect(page).toHaveURL(signUpUrl);
  }
};

export const signInAsync = async (
  page: Page,
  {
    account,
    shouldSuccess = true,
  }: {
    account: TestAccount;
    shouldSuccess?: boolean;
  },
) => {
  // GIVEN
  await page.goto(signInUrl);

  // WHEN
  await page.getByTestId('email-label').fill(account.email);
  await page.getByTestId('password-label').fill(account.password);
  await page.getByTestId('sign-in-button').click();

  // THEN
  if (shouldSuccess) {
    await expect(page).toHaveURL(homeUrl);
  } else {
    await expect(page).toHaveURL(signInUrl);
  }
};
