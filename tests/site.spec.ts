import { expect, test, type Page } from '@playwright/test';

const primaryRoutes = [
  '/',
  '/work/',
  '/think/',
  '/explore/',
  '/about/',
  '/work/mbti64/',
  '/work/perfectme/',
  '/2022/07/05/hello-world/',
  '/2022/07/05/zhubao315/',
  '/tags/',
  '/categories/',
  '/archives/',
  '/2022/07/05/',
];

const compatibilityRoutes = ['/2022/07/05/hello-world/', '/2022/07/05/zhubao315/', '/tags/', '/categories/', '/archives/'];

async function loadAllImages(page: Page) {
  await page.evaluate(async () => {
    document.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
      image.loading = 'eager';
    });

    await Promise.all(
      [...document.images].map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener('load', () => resolve(), { once: true });
              image.addEventListener('error', () => resolve(), { once: true });
            }),
      ),
    );
  });
}

test.describe('required routes', () => {
  for (const route of primaryRoutes) {
    test(`${route} renders without horizontal overflow`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.locator('html').getAttribute('lang')).toBe('zh-CN');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/zhubao315\.github\.io/);

      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      }));

      expect(layout.title.length).toBeGreaterThan(5);
      expect(layout.description.length).toBeGreaterThan(20);
      expect(layout.overflow).toBeLessThanOrEqual(1);
    });
  }

  test('404 page exists and is noindex', async ({ page }) => {
    const response = await page.goto('/404.html');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('这个地址');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });
});

test.describe('responsive QA widths', () => {
  for (const width of [1440, 1280, 768, 390, 375]) {
    test(`primary pages fit ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });

      for (const route of primaryRoutes) {
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${route} overflows at ${width}px`).toBeLessThanOrEqual(1);
      }
    });
  }
});

test.describe('homepage', () => {
  test('shows exactly six featured projects with varied treatments', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const pieces = page.locator('.featured-piece');
    await expect(pieces).toHaveCount(6);

    const text = await pieces.allTextContents();
    const combined = text.join('\n');
    for (const name of ['MBTI64', 'uSkill', 'Knowledge Base Engineering', 'Investment Discipline', 'Quantified Life', 'Perfect Me']) {
      expect(combined).toContain(name);
    }

    await expect(page.locator('.featured-piece--perfect')).toHaveCount(1);
    await expect(page.locator('.featured-piece--reverse')).toHaveCount(2);
  });

  test('loads all produced images', async ({ page }) => {
    for (const route of ['/', '/explore/', '/about/']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await loadAllImages(page);
      await page.waitForTimeout(750);

      const broken = await page.evaluate(() =>
        [...document.images]
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
      );
      expect(broken, `${route} has broken images`).toEqual([]);
    }
  });
});

test.describe('work index', () => {
  test('filters by category, search, query string, and resets', async ({ page }) => {
    await page.goto('/work/', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-project-card]')).toHaveCount(18);

    await page.getByRole('button', { name: /AI & Agent/ }).click();
    await expect(page.locator('[data-project-card]:visible')).toHaveCount(2);
    await expect(page.locator('[data-project-card]:visible').filter({ hasText: 'uSkill' })).toHaveCount(1);

    await page.locator('[data-filter-reset]').click();
    await expect(page.locator('[data-project-card]:visible')).toHaveCount(18);

    await page.locator('[data-project-search]').fill('MBTI');
    await expect(page.locator('[data-project-card]:visible')).toHaveCount(1);

    await page.locator('[data-filter-reset]').click();
    await page.goto('/work/?filter=agent', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-filter-category="agent"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-project-card]:visible')).toHaveCount(2);
  });
});

test.describe('navigation and compatibility', () => {
  test('mobile menu opens and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const menu = page.locator('details.mobile-menu');
    await menu.locator('summary').click();
    await expect(menu).toHaveAttribute('open', '');
    await expect(menu.getByRole('link', { name: /作品/ })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveAttribute('open', '');
  });

  for (const route of compatibilityRoutes) {
    test(`${route} is a noindex compatibility entry`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('body')).toContainText('兼容');
    });
  }
});
