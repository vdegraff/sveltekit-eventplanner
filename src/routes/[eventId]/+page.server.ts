import { fetchEventById } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const eventId = parseInt(params.eventId);
	return {
		event: fetchEventById(eventId)
	};
};
