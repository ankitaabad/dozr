<script>
	import { customersStore, getInitials, isManager } from '$lib/store';
	import logo from '$lib/assets/logo.svg';
</script>

<div
	class="flex bg-white items-center px-6 justify-between border-b border-gray-200 border-solid py-4"
>
	<div class="logo">
		<a href="/"><img src={logo} alt="Logo" /></a>
	</div>
	<!-- <div class="search min-w-[20%]">
		<form action="">
			<div class="">
				<input type="search" placeholder="What are you looking for today?" class="rounded w-full" />
			</div>
		</form>
	</div> -->
	<div class="flex items-center gap-2">
		<div class="flex items-center justify-center gap-2">
			<div
				class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white"
			>
				HK
			</div>
			<div>{$customersStore[0]?.first_name} {$customersStore[0]?.last_name}</div>
		</div>
	</div>
</div>
