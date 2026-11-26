import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// Expectations are derived from the single source of truth so data refreshes
// do not turn into false test failures.
const stats = JSON.parse(
  readFileSync(new URL('../src/data/generated/github-stats.json', import.meta.url), 'utf8'),
);

test.describe('Repository Explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/repositories/');
    await expect(page.locator('#repo-count')).toContainText(`${stats.public_repos} 个仓库`);
  });

  test('renders all public repositories with correct category distribution', async ({ page }) => {
    await expect(page.locator('.repo-card')).toHaveCount(stats.public_repos);
    const counts = await page.evaluate(() => {
      const result: Record<string, number> = {};
      document.querySelectorAll('.repo-card').forEach((card) => {
        const key = (card as HTMLElement).dataset.category ?? '?';
        result[key] = (result[key] ?? 0) + 1;
      });
      return result;
    });
    // Zero-count categories are not emitted as cards, so exclude them.
    const expected = Object.fromEntries(
      Object.entries(stats.by_category as Record<string, number>).filter(([, n]) => n > 0),
    );
    expect(counts).toMatchObject(expected);
  });

  test('filter by category, source, status and pages', async ({ page }) => {
    const visible = () => page.locator('.repo-card:visible').count();

    await page.locator('.repos-filter[data-filter="category"][data-value="BUILD"]').click();
    await expect(page.locator('#repo-count')).toContainText(`${stats.by_category.BUILD} 个仓库`);
    expect(await visible()).toBe(stats.by_category.BUILD);

    await page.locator('.repos-filter[data-filter="category"][data-value="ALL"]').click();
    await page.locator('.repos-filter[data-filter="source"][data-value="ORIGINAL"]').click();
    await expect(page.locator('#repo-count')).toContainText(`${stats.original} 个仓库`);

    await page.locator('.repos-filter[data-filter="source"][data-value="ALL"]').click();
    await page.locator('.repos-filter[data-filter="status"][data-value="DORMANT"]').click();
    await expect(page.locator('#repo-count')).toContainText(`${stats.statuses.DORMANT} 个仓库`);

    await page.locator('.repos-filter[data-filter="status"][data-value="ALL"]').click();
    await page.locator('.repos-filter[data-filter="pages"][data-value="YES"]').click();
    await expect(page.locator('#repo-count')).toContainText(`${stats.pages_ok} 个仓库`);
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
    await expect(page.locator('.repos-stat').nth(0)).toContainText(String(stats.public_repos));
    await expect(page.locator('.repos-stat').nth(1)).toContainText(String(stats.original));
    await expect(page.locator('.repos-stat').nth(2)).toContainText(String(stats.modified));
    await expect(page.locator('.repos-stat').nth(3)).toContainText(String(stats.upstream));
    await expect(page.locator('.repos-stat').nth(5)).toContainText(stats.last_verified);
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
