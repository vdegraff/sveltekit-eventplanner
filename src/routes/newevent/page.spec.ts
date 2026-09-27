import { describe, expect, it, vi } from 'vitest';
import { createEvent } from '$lib/server/remote-events';
import type { RequestEvent } from './$types';
import { actions } from './+page.server';

vi.mock('$lib/server/remote-events', () => ({
	createEvent: vi.fn()
}));

const eventFields = {
	title: 'vitest',
	description: 'test description',
	date: '2027-06-07T10:00:00Z'
};

function submit(fields: Record<string, string>) {
	const request = new Request('http://localhost/newevent', {
		method: 'POST',
		body: new URLSearchParams(fields)
	});
	return { request } as RequestEvent;
}

describe('new event', () => {
	it('redirect to created event', async () => {
		vi.mocked(createEvent).mockResolvedValue({ id: 42, ...eventFields });

		await expect(actions.default(submit(eventFields))).rejects.toMatchObject({
			status: 303,
			location: '/42'
		});
		expect(createEvent).toHaveBeenCalledWith(eventFields);
	});
});
