import { deleteEventById, fetchEventById } from '$lib/server/remote-events';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ params }) => {
	const eventId = parseInt(params.eventId);
	return {
		event: fetchEventById(eventId)
	};
};

export const actions: Actions = {
	delete: async ({ params }) => {
		await deleteEventById(parseInt(params.eventId));
		redirect(303, '/');
	}
};
