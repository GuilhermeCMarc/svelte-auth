<script lang="ts">
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let data: PageData;

	let searchValue = $page.data.initialSearch;

	async function search() {
		if (searchValue !== $page.url.searchParams.get('search')) {
			$page.url.searchParams.set('search', searchValue);
		}
	}
</script>

<form on:submit|preventDefault={search}>
	<input
		bind:value={searchValue}
		type="text"
		class="mb-10 inline-flex h-12 w-full rounded-sm bg-gray-800 px-4 shadow-sm"
	/>
	<button type="submit" class="sr-only" />
</form>

<ul class="mb-10 flex flex-col gap-6">
	{#each data.users as user}
		<li class="rounded-sm bg-gray-800 shadow-sm">
			<div class="border-b-[1px] border-b-gray-700 px-6 py-4 last:border-b-0">
				<h3 class="text-lg font-bold text-white">
					{user.name}
				</h3>
			</div>
			<div class="border-b-[1px] border-b-gray-700 px-6 py-4 last:border-b-0">
				{user.email}
			</div>
		</li>
	{/each}
</ul>

<p>Results: {data.total}</p>
