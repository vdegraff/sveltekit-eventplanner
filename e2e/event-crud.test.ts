import { expect, test } from '@playwright/test';

const title = `playwright ${Date.now()}`;
const editedTitle = `${title} edited`;
const description = 'created by an end to end test';
const date = '2099-06-07T10:00';

test('full CRUD flow for event', async ({ page }) => {
	const eventUrl = await test.step('create and verify', async () => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Add Event' }).click();

		await page.getByLabel('Title').fill(title);
		await page.getByLabel('Description').fill(description);
		await page.getByLabel('Date').fill(date);
		await page.getByRole('button', { name: 'Create Event' }).click();

		await expect(page).toHaveURL(/\/\d+$/);
		await expect(page.getByRole('heading', { name: title })).toBeVisible();
		await expect(page.getByText(description)).toBeVisible();

		return page.url();
	});

	await test.step('update and verify', async () => {
		await page.getByRole('link', { name: 'Edit Event' }).click();
		await expect(page.getByLabel('Date')).toHaveValue(date);
		await page.getByLabel('Title').fill(editedTitle);
		await page.getByRole('button', { name: 'Save Changes' }).click();

		await expect(page).toHaveURL(eventUrl);
		await expect(page.getByRole('heading', { name: editedTitle })).toBeVisible();
		await expect(page.getByText(description)).toBeVisible();
	});

	await test.step('delete and verify inaccessible', async () => {
		await page.getByRole('button', { name: 'Delete Event' }).click();
		await page.getByRole('button', { name: 'Confirm Delete' }).click();
		await expect(page).toHaveURL('/');

		await page.goto(eventUrl);
		await expect(page.getByRole('heading', { name: editedTitle })).toHaveCount(0);
	});
});
