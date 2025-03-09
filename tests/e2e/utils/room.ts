import { expect, type Page } from '@playwright/test';
import { homeUrl } from '@tests/constants/urls';
import { type TestRoom } from '@tests/types/room';

export const generateRandomRoom = ({
  emptyPassword,
}: {
  emptyPassword?: boolean;
}): TestRoom => {
  return {
    name: `test${Math.random()}`,
    password: emptyPassword ? undefined : `test${Math.random()}`,
  };
};

export const createRoomAsync = async (
  page: Page,
  {
    room,
    shouldSuccess,
  }: {
    room: TestRoom;
    shouldSuccess: boolean;
  },
) => {
  // GIVEN
  await page.goto(homeUrl);

  // WHEN
  await page.getByTestId('create-room-button').click();
  await page.getByTestId('room-name-label').fill(room.name);
  await page.getByTestId('room-password-label').fill(room.password || '');
  await page.getByTestId('create-room-modal-create-button').click();

  // THEN
  if (shouldSuccess) {
    await expect(page).toHaveURL(/.*rooms\/\d+$/);
  } else {
    await expect(page).toHaveURL(homeUrl);
  }
};

export const joinRoomAsync = async (
  page: Page,
  {
    room,
    shouldSuccess,
  }: {
    room: TestRoom;
    shouldSuccess: boolean;
  },
) => {
  // GIVEN
  await page.goto(homeUrl);

  // WHEN
  const roomItem = await page.getByTestId(`room-name-${room.name}`);
  await roomItem.first().click();

  // THEN
  if (shouldSuccess) {
    await expect(page).toHaveURL(/.*rooms/);
    await expect(page.getByTestId('room')).toBeVisible();
  } else {
    await expect(page).toHaveURL(homeUrl);
  }
};
