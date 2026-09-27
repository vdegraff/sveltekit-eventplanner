<script lang="ts">
	import { onMount } from 'svelte';

	let theme = $state('light');

	onMount(() => {
		theme =
			document.documentElement.dataset.theme ??
			(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	}
</script>

<button type="button" class="btn btn-ghost btn-sm" onclick={toggleTheme}>
	{theme === 'dark' ? 'Light mode' : 'Dark mode'}
</button>
