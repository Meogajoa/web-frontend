import { expect, test } from '@playwright/test';
import { signInUrl, signUpUrl } from '@tests/constants/urls';
import {
  generateRandomAccount,
  signInAsync,
  signUpAsync,
} from '@tests/e2e/utils/auth';

test.describe('Sign up', () => {
  test('should sign up', async ({ page }) => {
    // GIVEN
    const account = generateRandomAccount();

    // WHEN & THEN
    await signUpAsync(page, {
      account,
      shouldSuccess: true,
    });
  });

  test('should fail to sign up', async ({ page }) => {
    // GIVEN
    const account = generateRandomAccount();
    account.passwordConfirmation = 'wrong-password';

    // WHEN & THEN
    await signUpAsync(page, {
      account,
      shouldSuccess: false,
    });
  });

  test('should go to sign in page', async ({ page }) => {
    // GIVEN
    await page.goto(signUpUrl);

    // WHEN
    await page.getByTestId('go-to-sign-in-button').click();

    // THEN
    await expect(page).toHaveURL(signInUrl);
  });
});

test.describe('Sign in', () => {
  test('should sign in', async ({ page }) => {
    // GIVEN
    const account = generateRandomAccount();
    await signUpAsync(page, {
      account,
      shouldSuccess: true,
    });

    // WHEN & THEN
    await signInAsync(page, {
      account,
      shouldSuccess: true,
    });
  });

  test('should fail to sign in', async ({ page }) => {
    // GIVEN
    const account = generateRandomAccount();
    await signUpAsync(page, {
      account,
      shouldSuccess: true,
    });
    account.password = 'wrong-password';

    // WHEN & THEN
    await signInAsync(page, {
      account,
      shouldSuccess: false,
    });
  });
});
