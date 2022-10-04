<script lang="ts">
	import { fade } from 'svelte/transition';
	import Spinner from './Spinner.svelte';

	export let loading = false;
</script>

{#if loading}
	<div
		transition:fade={{ duration: 100 }}
		class="absolute left-0 top-0 z-10 grid h-full w-full place-items-center rounded-md bg-gray-900/75 backdrop-blur-sm"
	>
		<div class="h-6 w-6 fill-primary-300">
			<Spinner />
		</div>
	</div>
{/if}
