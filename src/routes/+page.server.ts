import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		events: fetchAllEvents()
	};
};
