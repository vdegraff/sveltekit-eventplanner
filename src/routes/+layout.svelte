<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	let { children } = $props();
</script>

<div class="navbar bg-base-200">
	<div class="mx-auto flex w-full max-w-3xl items-center justify-between px-4">
		<a class="text-xl font-bold" href="/">Event Planner</a>
		<ThemeToggle />
	</div>
</div>
<main class="mx-auto w-full max-w-3xl px-4 py-8">
	{@render children()}
</main>
