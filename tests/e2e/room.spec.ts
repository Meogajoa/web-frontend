import { test } from '@playwright/test';
import {
  generateRandomAccount,
  signInAsync,
  signUpAsync,
} from '@tests/e2e/utils/auth';
import { createRoomAsync, joinRoomAsync } from '@tests/e2e/utils/room';
import { range } from 'lodash-es';

const TEST_ROOM_NAME = 'example-name';
const ROOM_JOIN_USER_COUNT = 8;

test.describe('Create room', () => {
  test('should create room', async ({ page }) => {
    // GIVEN
    const account = generateRandomAccount();

    await signUpAsync(page, {
      account,
      shouldSuccess: true,
    });

    await signInAsync(page, {
      account,
      shouldSuccess: true,
    });

    // WHEN & THEN
    await createRoomAsync(page, {
      room: {
        name: TEST_ROOM_NAME,
      },
      shouldSuccess: true,
    });
  });
});

test.describe(`Join room with ${ROOM_JOIN_USER_COUNT} users`, () => {
  range(ROOM_JOIN_USER_COUNT).forEach((_, index) => {
    test(`should join room with user ${index + 1}`, async ({ page }) => {
      // GIVEN
      const account = generateRandomAccount();

      await signUpAsync(page, {
        account,
        shouldSuccess: true,
      });

      await signInAsync(page, {
        account,
        shouldSuccess: true,
      });

      // WHEN & THEN
      await joinRoomAsync(page, {
        room: {
          name: TEST_ROOM_NAME,
        },
        shouldSuccess: true,
      });
    });
  });
});
