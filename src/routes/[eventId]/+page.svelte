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

<a class="link link-hover mb-6 inline-block" href="/">&larr; Back to Events</a>

{#await data.event}
	<div class="skeleton h-48 w-full"></div>
{:then event}
	{#if event}
		<div class="card bg-base-200">
			<div class="card-body">
				<h1 class="card-title text-3xl">{event.title}</h1>
				<p class="text-sm opacity-70">{formatEventDate(event.date)}</p>
				{#if event.description}
					<p class="whitespace-pre-line">{event.description}</p>
				{/if}
				<div class="card-actions mt-4 items-center gap-2">
					<a class="btn btn-outline" href="/editevent/{event.id}" onclick={openEditor}>Edit Event</a
					>
					{#if !confirmingDelete}
						<button type="button" class="btn btn-outline btn-error" onclick={startDelete}>
							Delete Event
						</button>
					{:else if !deleting}
						<form method="POST" action="?/delete" use:enhance={handleDelete} class="flex gap-2">
							<button type="submit" class="btn btn-error">Confirm Delete</button>
							<button type="button" class="btn btn-outline" onclick={cancelDelete}
								>Cancel Delete</button
							>
						</form>
					{:else}
						<span class="loading loading-spinner"></span>
						<span>Deleting event...</span>
					{/if}
					{#if loadingEditor}
						<span class="loading loading-spinner"></span>
						<span>Loading editor...</span>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{:catch}
	<div class="alert alert-error">Could not load event.</div>
{/await}
