import { describe, expect, it, vi } from 'vitest';
import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoadEvent } from './$types';
import { load } from './+page.server';

vi.mock('$lib/server/remote-events', () => ({
	fetchAllEvents: vi.fn()
}));

describe('events list', () => {
	it('stream events', () => {
		vi.mocked(fetchAllEvents).mockResolvedValue([]);

		const data = load({} as PageServerLoadEvent) as { events: Promise<unknown> };
		expect(data.events).toBeInstanceOf(Promise);
	});
});
