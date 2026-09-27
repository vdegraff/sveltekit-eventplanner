<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatEventDate } from '$lib/event-date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let confirmingDelete = $state(false);
	let deleting = $state(false);
	let loadingEditor = $state(false);

	function openEditor() {
		loadingEditor = true;
	}

	function startDelete() {
		confirmingDelete = true;
	}

	function cancelDelete() {
		confirmingDelete = false;
	}

	function handleDelete() {
		deleting = true;
	}
</script>

<a href="/">Back to Events</a>
<div>
	{#await data.event}
		<p>Loading event...</p>
	{:then event}
		{#if event}
			<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
			<p>{event.description}</p>
			<p>{formatEventDate(event.date)}</p>
			<a href="/editevent/{event.id}" onclick={openEditor}>Edit Event</a>
			{#if loadingEditor}
				<p>Loading editor...</p>
			{/if}
			{#if !confirmingDelete}
				<button type="button" class="btn" onclick={startDelete}>Delete Event</button>
			{:else if !deleting}
				<form method="POST" action="?/delete" use:enhance={handleDelete}>
					<button type="submit" class="btn">Confirm Delete</button>
					<button type="button" class="btn" onclick={cancelDelete}>Cancel Delete</button>
				</form>
			{:else}
				<p>Deleting event...</p>
			{/if}
		{/if}
	{:catch}
		<p>Could not load event.</p>
	{/await}
</div>
