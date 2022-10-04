<script lang="ts">
	import '../app.css';
	import { fade, fly } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
</script>

<svelte:head>
	<title>Authentication with svelte</title>
</svelte:head>

{#if $navigating}
	<div in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
		<ProgressBar />
	</div>
{/if}
<div class="min-h-screen bg-gray-900 text-gray-300">
	<slot />
</div>
