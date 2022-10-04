<div class="mx-auto max-w-screen-lg p-6">
	<nav class="mb-10 flex w-full justify-between">
		<a class="block" href="/">Plataforma</a>

		<div class="flex gap-6">
			<a href="/users">Users</a>
			<form action="/logout" method="post">
				<button type="submit">Logout</button>
			</form>
		</div>
	</nav>

	<slot />
</div>
