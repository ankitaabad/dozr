<script lang="ts">
	import { loansStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import Loansvg from './Loansvg.svelte';
	$: handler = new DataHandler($loansStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>

{#if !$rows?.length}
	<div class="h-[90%] flex items-center justify-center font-medium bg-gray-50 rounded-md">
		<div class="flex flex-col gap-4 justify-center items-center">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-file"
					width="56"
					height="56"
					viewBox="0 0 24 24"
					stroke-width="1"
					stroke="#495a8f"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M14 3v4a1 1 0 0 0 1 1h4"
					/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg
				>
			</div>
			<div class="font-normal text-gray-500 text-center">You don't have any active loans.</div>
		</div>
	</div>
{:else}
	<div class="flex flex-col gap-4">
		{#each $rows as row}
			<div class="w-full border border-solid border-gray-300 rounded-md p-4">
				<div class="flex gap-3 items-center">
					<div
						class=" p-3 rounded border border-solid border-gray-300 flex justify-between items-center"
					>
						<Loansvg loan_type={row.loan_type} />
					</div>
					<div class=" flex flex-col gap-1">
						<div class="font-medium">{row.loan_type}</div>
						<div class="font-semibold text-sm">EMI: {row.EMI}</div>
					</div>
				</div>
				<div class="mt-3 mb-0 text-gray-400"><em>{row.repayment_schedule}</em></div>
			</div>
		{/each}
	</div>
{/if}
