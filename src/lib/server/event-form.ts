import { error } from '@sveltejs/kit';
import { parseEventDate, toStoredDate } from '$lib/event-date';

function isUtcDate(value: string) {
	const parsed = new Date(value);
	return !Number.isNaN(parsed.getTime()) && toStoredDate(parsed) === value;
}

export function parseEventForm(formdata: FormData, originalDate?: string) {
	const title = formdata.get('title')?.toString();
	const description = formdata.get('description')?.toString();
	const date = formdata.get('date')?.toString();

	if (!title || !date) {
		error(400, 'Title and Date are required');
	}
	if (!isUtcDate(date)) {
		error(400, 'Date must be a valid UTC date and time');
	}
	const unchanged =
		originalDate !== undefined &&
		new Date(date).getTime() === parseEventDate(originalDate).getTime();
	if (!unchanged && new Date(date) < new Date()) {
		error(400, 'Date must be in the future');
	}
	return { title, description, date };
}
