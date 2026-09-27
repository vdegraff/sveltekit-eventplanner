import { describe, expect, it } from 'vitest';
import { parseEventDate, toDateInput, toStoredDate } from './event-date';

const stored = '2099-06-07T17:30:00Z';

describe('event dates', () => {
	it('format for remote-events.ts', () => {
		expect(toStoredDate(new Date('2099-06-07T17:30:00.789Z'))).toBe(stored);
	});

	it('round trip through date input', () => {
		expect(new Date(toDateInput(stored)).getTime()).toBe(parseEventDate(stored).getTime());
	});
});
