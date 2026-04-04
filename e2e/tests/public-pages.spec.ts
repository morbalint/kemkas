import { expect, test } from '@playwright/test';

async function mockGuestSession(page: import('@playwright/test').Page): Promise<void> {
  await page.route('**/api/User/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/plain; charset=utf-8',
      body: '',
    });
  });
}

test('guest users are redirected to 2e character creation', async ({ page }) => {
  await mockGuestSession(page);

  await page.goto('/');

  await expect(page).toHaveURL(/\/2e\/karakter$/);
  await expect(page.getByRole('heading', { name: 'Karakter létrehozása' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Mentés/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /PDF/ })).toBeVisible();
});

test('guest navigation shows Register and Login links', async ({ page }) => {
  await mockGuestSession(page);

  await page.goto('/2e/karakter');

  const registerLink = page.getByRole('link', { name: 'Register' });
  const loginLink = page.getByRole('link', { name: 'Login' });

  await expect(registerLink).toBeVisible();
  await expect(registerLink).toHaveAttribute('href', '/Identity/Account/Register');
  await expect(loginLink).toBeVisible();
  await expect(loginLink).toHaveAttribute('href', '/Identity/Account/Login');
});

test('public legal pages are served', async ({ page }) => {
  await page.goto('/privacy.html');
  await expect(page.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeVisible();

  await page.goto('/ogl.html');
  await expect(page).toHaveTitle(/Open Game License v1\.0a/);
  await expect(page.locator('body')).toContainText('OPEN GAME LICENSE Version 1.0a');

  await page.goto('/aelf.html');
  await expect(page).toHaveTitle(/AELF Open License version 1\.0a/);
  await expect(page.locator('body')).toContainText('AELF OPEN LICENSE VERSION 1.0a');
});
