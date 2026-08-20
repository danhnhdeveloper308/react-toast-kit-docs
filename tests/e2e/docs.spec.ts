import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('documentation experience', () => {
  test('has no serious accessibility violations and exposes toast semantics', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
    expect(
      results.violations.filter((item) => ['serious', 'critical'].includes(item.impact || ''))
    ).toEqual([]);

    await page.getByRole('button', { name: 'Success', exact: true }).click();
    const toast = page.locator('[data-testid^="toast-"]').filter({ hasText: 'Success!' });
    await expect(toast).toBeVisible();
    await expect(toast.getByRole('button', { name: 'Close notification' })).toBeVisible();
  });

  for (const width of [320, 375, 768, 1024, 1440]) {
    test(`fits the viewport at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 600 ? 720 : 900 });
      await page.goto('/');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      if (width < 768)
        await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
    });
  }

  test('supports dark mode and stable visual rendering', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await expect(page.locator('[data-theme-ready="true"]')).toBeVisible();
    await expect(page).toHaveScreenshot('home-light.png');
    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page).toHaveScreenshot('home-dark.png');
  });

  test('keeps documentation navigation usable on narrow screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/docs/');
    await page.getByRole('button', { name: 'Navigation' }).click();
    await expect(
      page.locator('.sidebar-drawer').getByText('Documentation', { exact: true })
    ).toBeVisible();
    await page.locator('.sidebar-drawer').getByRole('link', { name: 'Theming' }).click();
    await expect(page).toHaveURL(/\/docs\/theming/);
  });
});
