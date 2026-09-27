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

<form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-4">
	<!-- form for creating or editing an event -->
	<div class="form-control">
		<label class="label" for="title">
			<span class="label-text">Title</span>
		</label>
		<input
			type="text"
			id="title"
			name="title"
			class="input input-bordered"
			value={event?.title}
			required
		/>
	</div>
	<div class="form-control">
		<label class="label" for="description">
			<span class="label-text">Description</span>
		</label>
		<textarea
			id="description"
			name="description"
			rows="4"
			class="textarea textarea-bordered"
			placeholder="Optional"
			value={event?.description}
		></textarea>
	</div>
	<div class="form-control">
		<label class="label" for="date">
			<span class="label-text">Date</span>
		</label>
		<input
			type="datetime-local"
			id="date"
			name="date"
			class="input input-bordered"
			value={event ? toDateInput(event.date) : undefined}
			required
		/>
	</div>
	{#if dateInPast}
		<div class="alert alert-error">Date must be in the future</div>
	{/if}
	<div class="flex items-center gap-3">
		<button type="submit" class="btn btn-primary" disabled={submitting}>
			{event ? 'Save Changes' : 'Create Event'}
		</button>
		{#if submitting}
			<span class="loading loading-spinner"></span>
			<span>{event ? 'Saving event...' : 'Creating event...'}</span>
		{/if}
	</div>
</form>
