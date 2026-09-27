import { error } from '@sveltejs/kit';

export function parseEventForm(formdata: FormData) {
	const title = formdata.get('title')?.toString();
	const description = formdata.get('description')?.toString();
	const date = formdata.get('date')?.toString();
	if (!title || !date) {
		error(400, 'Title and Date are required');
	}
	return { title, description, date };
}
