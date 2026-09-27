import { parseEventForm } from '$lib/server/event-form';
import { fetchEventById, updateEventById } from '$lib/server/remote-events';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const eventId = parseInt(params.eventId);
	return {
		event: await fetchEventById(eventId)
	};
};

export const actions: Actions = {
	default: async ({ params, request }) => {
		const eventId = parseInt(params.eventId);
		const existing = await fetchEventById(eventId);
		const eventFields = parseEventForm(await request.formData(), existing?.date);
		await updateEventById(eventId, eventFields);
		redirect(303, `/${eventId}`);
	}
};
