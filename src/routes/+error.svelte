<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="grid min-h-screen place-items-center px-6">
	<div class="text-center">
		<h1 class="mb-2 text-xl font-bold text-white">Error {$page.status}</h1>
		<p>{$page.error?.message}</p>
	</div>
</div>
