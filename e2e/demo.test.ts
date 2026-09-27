import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	const pageTitle = page.getByTestId('page-title');
	await expect(pageTitle).toHaveJSProperty('tagName', 'H1');
	await expect(pageTitle).toBeVisible();
});
