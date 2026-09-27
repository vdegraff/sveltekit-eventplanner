import { parseEventForm } from '$lib/server/event-form';
import { createEvent } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const eventFields = parseEventForm(await request.formData());
		const newEvent = await createEvent(eventFields);
		redirect(303, `/${newEvent.id}`);
	}
};
