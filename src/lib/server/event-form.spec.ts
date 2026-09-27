import { isHttpError } from '@sveltejs/kit';
import { describe, expect, it } from 'vitest';
import { parseEventForm } from './event-form';

const future = '2099-06-07T10:00:00Z';
const past = '2020-06-07T10:00:00Z';

function buildFormData(fields: Record<string, string>) {
	const data = new FormData();
	for (const [key, value] of Object.entries(fields)) {
		data.set(key, value);
	}
	return data;
}

function rejectionMessage(fields: Record<string, string>, originalDate?: string) {
	try {
		parseEventForm(buildFormData(fields), originalDate);
		return 'did not reject';
	} catch (thrown) {
		if (!isHttpError(thrown, 400)) {
			throw thrown;
		}
		return thrown.body.message;
	}
}

describe('event form', () => {
	it('return fields on edit', () => {
		expect(parseEventForm(buildFormData({ title: 'vitest', date: future, id: '999' }))).toEqual({
			title: 'vitest',
			date: future
		});
	});

	it('reject missing title', () => {
		expect(rejectionMessage({ date: future })).toBe('Title and Date are required');
	});

	it('reject trash date', () => {
		expect(rejectionMessage({ title: 'vitest', date: 'banana' })).toBe(
			'Date must be a valid UTC date and time'
		);
	});

	it('reject date without timezone', () => {
		expect(rejectionMessage({ title: 'vitest', date: '2099-06-07T10:00:00' })).toBe(
			'Date must be a valid UTC date and time'
		);
	});

	it('reject past date', () => {
		expect(rejectionMessage({ title: 'vitest', date: past })).toBe('Date must be in the future');
	});

	it('allow unchanged past date', () => {
		expect(parseEventForm(buildFormData({ title: 'vitest', date: past }), past).date).toBe(past);
	});
});
