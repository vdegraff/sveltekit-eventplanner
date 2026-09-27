<script lang="ts">
	import EventForm from '$lib/event-form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.event}
	<h1 class="mb-6 text-3xl font-bold">Edit Event</h1>
	<EventForm event={data.event} />
	<a class="link link-hover mt-6 inline-block" href="/{data.event.id}">Cancel Edit</a>
{/if}
