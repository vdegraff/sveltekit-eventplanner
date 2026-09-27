<script lang="ts">
	import { formatEventDate } from '$lib/event-date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mb-6 flex items-center justify-between gap-4">
	<h1 class="text-3xl font-bold" data-testid="page-title">Events</h1>
	<a class="btn btn-primary" href="/newevent">Add Event</a>
</div>
{#await data.events}
	<div class="flex flex-col gap-4">
		<div class="skeleton h-24 w-full"></div>
		<div class="skeleton h-24 w-full"></div>
		<div class="skeleton h-24 w-full"></div>
	</div>
{:then events}
	{#if events.length === 0}
		<div class="rounded-box bg-base-200 p-8 text-center">
			<p class="mb-4">No recorded events.</p>
		</div>
	{:else}
		<ul class="flex flex-col gap-4">
			{#each events as event}
				<li class="card bg-base-200">
					<div class="card-body">
						<h2 class="card-title">
							<a class="link" href="/{event.id}">{event.title}</a>
						</h2>
						<p class="text-sm opacity-70">{formatEventDate(event.date)}</p>
						{#if event.description}
							<p class="whitespace-pre-line">{event.description}</p>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
{:catch}
	<div class="alert alert-error">Could not load events.</div>
{/await}
