<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import LoadingOverlay from '$lib/components/LoadingOverlay.svelte';

	export let form: ActionData;

	let loading = false;
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<form
	action="?/register"
	method="POST"
	class="relative flex w-[450px] flex-col gap-5 rounded-md bg-gray-800 p-6 shadow-lg"
	use:enhance={({}) => {
		loading = true;

		return async ({ result, update }) => {
			if (result.type === 'error') await applyAction(result);
			loading = false;
			await update();
		};
	}}
>
	<LoadingOverlay {loading} />

	<div>
		<h3 class="mb-1 text-xl font-bold text-white">Register</h3>
		<p>Create your account</p>
	</div>

	<hr class="border-gray-700" />

	<div class="flex flex-col gap-2">
		<label for="name">Name</label>
		<input
			required
			id="name"
			name="name"
			type="text"
			placeholder="John Doe"
			class="inline-flex h-12 items-center rounded-sm border-2 border-gray-700 bg-gray-700 px-4 outline-none transition-colors placeholder:text-gray-500 hover:border-gray-700 focus:border-primary-500
			{form?.invalid && 'border-red-600'}"
		/>
		{#if form?.invalid}
			<p class="text-red-500">Invalid form</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="email">Email</label>
		<input
			required
			id="email"
			name="email"
			type="email"
			placeholder="johndoe@example.com"
			class="inline-flex h-12 items-center rounded-sm border-2 border-gray-700 bg-gray-700 px-4 outline-none transition-colors placeholder:text-gray-500 hover:border-gray-700 focus:border-primary-500
			{(form?.exists || form?.invalid) && 'border-red-600'}
			"
		/>
		{#if form?.exists}
			<p class="text-red-500">Invalid Credentials</p>
		{/if}
		{#if form?.invalid}
			<p class="text-red-500">Invalid form</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="password">Password</label>
		<input
			required
			id="password"
			name="password"
			type="password"
			placeholder="********"
			class="inline-flex h-12 items-center rounded-sm border-2 border-gray-700 bg-gray-700 px-4 outline-none transition-colors placeholder:text-gray-500 hover:border-gray-700 focus:border-primary-500
			{form?.invalid && 'border-red-600'}"
		/>
		{#if form?.invalid}
			<p class="text-red-500">Invalid form</p>
		{/if}
	</div>
	<button
		type="submit"
		class="mt-2 inline-flex h-12 w-full items-center justify-center rounded-sm bg-primary-600 px-4 text-center text-white transition-colors hover:bg-primary-700"
		>Register</button
	>

	<div class="text-center">
		<p>Already have an account? <a class="text-primary-400" href="/login">Login</a></p>
	</div>
</form>
