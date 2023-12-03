<script lang="ts">
	import { loansStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import Loansvg from './Loansvg.svelte';
	$: handler = new DataHandler($loansStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>

<div class="flex flex-col gap-3">
	{#each $rows as row}
		<div class="w-full card px-4 py-6">
			<div class="flex gap-2 items-center">
				<div
					class="p-3 rounded border border-solid border-gray-300 flex justify-between items-center"
				>
					<Loansvg loan_type={row.loan_type} />
				</div>
				<div class=" flex flex-col gap-1">
					<div class="font-medium">{row.loan_type}</div>
					<div class="font-semibold text-sm">EMI: {row.EMI}</div>
				</div>
			</div>
			<div class="mt-4 mb-0 text-gray-400"><em>{row.repayment_schedule}</em></div>
		</div>
	{/each}
</div>
