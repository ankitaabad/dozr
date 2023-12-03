<script lang="ts">
	import { customerBalanceStore } from '$lib/store';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	function showAddMoneyModal() {
		//console.log('inside add money');
		const modal: ModalSettings = {
			type: 'component',
			component: 'addMoneyModel'
		};

		modalStore.trigger(modal);
	}
</script>

<div class="w-[25%] card p-6 flex flex-col">
	<div>
		<div class="heading mb-6">
			<h2 class="font-medium text-lg">Account balance</h2>
		</div>
		<div class="text-2xl font-semibold">₹{$customerBalanceStore[0]?.balance}</div>
	</div>
	<!-- <div class="my-6">
		<div class=" ">
			<a
				href="#"
				class="py-5 border-t border-b border-solid border-gray-100 flex justify-between w-full items-center"
			>
				<div>Withdraw</div>
				<div>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_24_73)">
							<path
								d="M6 12L10 8L6 4"
								stroke="#374151"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g>
						<defs>
							<clipPath id="clip0_24_73">
								<rect width="16" height="16" fill="white" transform="translate(0 16) rotate(-90)" />
							</clipPath>
						</defs>
					</svg>
				</div>
			</a>
		</div>
	</div>
	<div class="">
		<div>
			<a
				href="#"
				class="pb-5 border-b border-solid border-gray-100 flex justify-between w-full items-center"
			>
				<div>All transactions</div>
				<div>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_24_73)">
							<path
								d="M6 12L10 8L6 4"
								stroke="#374151"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g>
						<defs>
							<clipPath id="clip0_24_73">
								<rect width="16" height="16" fill="white" transform="translate(0 16) rotate(-90)" />
							</clipPath>
						</defs>
					</svg>
				</div>
			</a>
		</div>
	</div> -->
	<button
		type="button"
		class="mt-auto btn w-full rounded bg-primary-500 variant-filled-primary"
		on:click={showAddMoneyModal}>Add Money</button
	>
</div>
