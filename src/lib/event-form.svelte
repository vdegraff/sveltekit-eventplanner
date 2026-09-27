<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Event } from '$lib/server/remote-events';

	let { event }: { event?: Event } = $props();

	let submitting = $state(false);

	function handleSubmit() {
		submitting = true;
	}
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
	<input type="datetime-local" id="date" name="date" value={event?.date} required />
	<button type="submit" class="btn" disabled={submitting}>
		{event ? 'Save Changes' : 'Create Event'}
	</button>
	{#if submitting}
		<p>{event ? 'Saving event...' : 'Creating event...'}</p>
	{/if}
</form>
