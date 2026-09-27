<script lang="ts">
	import EventForm from '$lib/event-form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.event}
	<EventForm event={data.event} />
	<a href="/{data.event.id}">Cancel Edit</a>
{/if}
