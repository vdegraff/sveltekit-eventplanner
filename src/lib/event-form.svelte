<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { parseEventDate, toDateInput, toStoredDate } from '$lib/event-date';
	import type { Event } from '$lib/server/remote-events';

	let { event }: { event?: Event } = $props();

	let submitting = $state(false);
	let dateInPast = $state(false);

	const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
		const selected = new Date(formData.get('date')?.toString() ?? '');
		if (Number.isNaN(selected.getTime())) {
			submitting = true;
			return;
		}
		const unchanged = event ? selected.getTime() === parseEventDate(event.date).getTime() : false;
		if (!unchanged && selected < new Date()) {
			dateInPast = true;
			cancel();
			return;
		}
		dateInPast = false;
		formData.set('date', toStoredDate(selected));
		submitting = true;
	};
</script>

<form method="POST" use:enhance={handleSubmit}>
	<!-- form for creating or editing an event -->
	<label for="title">Title</label>
	<input type="text" id="title" name="title" value={event?.title} required />
	<textarea
		id="description"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
		value={event?.description}
	></textarea>
	<label for="date">Date</label>
	<input
		type="datetime-local"
		id="date"
		name="date"
		value={event ? toDateInput(event.date) : undefined}
		required
	/>
	{#if dateInPast}
		<p>Date must be in the future</p>
	{/if}
	<button type="submit" class="btn" disabled={submitting}>
		{event ? 'Save Changes' : 'Create Event'}
	</button>
	{#if submitting}
		<p>{event ? 'Saving event...' : 'Creating event...'}</p>
	{/if}
</form>
