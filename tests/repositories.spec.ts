import { expect, test } from '@playwright/test';

test.describe('Repository Explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/repositories/');
    await expect(page.locator('#repo-count')).toContainText('67 个仓库');
  });

  test('renders all 67 cards with correct category distribution', async ({ page }) => {
    await expect(page.locator('.repo-card')).toHaveCount(67);
    const counts = await page.evaluate(() => {
      const result: Record<string, number> = {};
      document.querySelectorAll('.repo-card').forEach((card) => {
        const key = (card as HTMLElement).dataset.category ?? '?';
        result[key] = (result[key] ?? 0) + 1;
      });
      return result;
    });
    expect(counts).toMatchObject({ BUILD: 41, THINK: 13, MEASURE: 6, CREATE: 7});
  });

  test('filter by category, source, status and pages', async ({ page }) => {
    const visible = () => page.locator('.repo-card:visible').count();

    await page.locator('.repos-filter[data-filter="category"][data-value="BUILD"]').click();
    await expect(page.locator('#repo-count')).toContainText('41 个仓库');
    expect(await visible()).toBe(41);

    await page.locator('.repos-filter[data-filter="category"][data-value="ALL"]').click();
    await page.locator('.repos-filter[data-filter="source"][data-value="ORIGINAL"]').click();
    await expect(page.locator('#repo-count')).toContainText('28 个仓库');

    await page.locator('.repos-filter[data-filter="source"][data-value="ALL"]').click();
    await page.locator('.repos-filter[data-filter="status"][data-value="DORMANT"]').click();
    await expect(page.locator('#repo-count')).toContainText('29 个仓库');

    await page.locator('.repos-filter[data-filter="status"][data-value="ALL"]').click();
    await page.locator('.repos-filter[data-filter="pages"][data-value="YES"]').click();
    await expect(page.locator('#repo-count')).toContainText('20 个仓库');
  });

  test('search filters by name and description', async ({ page }) => {
    const search = page.locator('#repo-search');
    await search.fill('uread');
    await expect(page.locator('#repo-count')).toContainText('1 个仓库');
    await expect(page.locator('.repo-card:visible h3')).toContainText('uRead');

    await search.fill('跑步');
    await expect(page.locator('#repo-count')).toContainText('1 个仓库');
    await expect(page.locator('.repo-card:visible h3')).toContainText('running');

    await search.fill('not-a-real-repo-xyz');
    await expect(page.locator('#repo-empty')).toBeVisible();
  });

  test('navigation includes Repository entry in both desktop and mobile menus', async ({ page }) => {
    const isMobile = (page.viewportSize()?.width ?? 1440) < 500;
    if (isMobile) {
      const menu = page.locator('.mobile-panel');
      await page.locator('summary').filter({ hasText: 'MENU' }).click();
      await expect(menu).toBeVisible();
      const link = menu.locator('a.mobile-link[href="/repositories/"]');
      await expect(link).toContainText('仓库');
      await expect(link).toHaveClass(/is-active/);
    } else {
      const link = page.locator('.nav-link[href="/repositories/"]');
      await expect(link).toBeVisible();
      await expect(link).toHaveClass(/is-active/);
    }
  });

  test('stats strip shows single-source-of-truth numbers', async ({ page }) => {
    await expect(page.locator('.repos-stat').nth(0)).toContainText('67');
    await expect(page.locator('.repos-stat').nth(1)).toContainText('28');
    await expect(page.locator('.repos-stat').nth(2)).toContainText('12');
    await expect(page.locator('.repos-stat').nth(3)).toContainText('27');
    await expect(page.locator('.repos-stat').nth(5)).toContainText('2026-11-24');
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
