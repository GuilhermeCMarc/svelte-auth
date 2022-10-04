<div class="fixed top-0 left-0 h-1 w-full overflow-hidden bg-gray-800/50">
	<div class="progress h-full w-full bg-primary-500" />
</div>

<style>
	.progress {
		animation: indeterminate 600ms infinite linear;
		transform-origin: 0% 50%;
	}

	@keyframes indeterminate {
		0% {
			transform: translateX(0) scaleX(0);
		}
		40% {
			transform: translateX(0) scaleX(0.4);
		}
		100% {
			transform: translateX(100%) scaleX(0.5);
		}
	}
</style>
