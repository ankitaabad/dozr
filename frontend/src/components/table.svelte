<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	const sourceData = [
		{ position: 1, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' },
		{ position: 2, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' },
		{ position: 3, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' },
		{ position: 4, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' },
		{ position: 5, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' }
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Trade Price', 'Qty', 'Amount'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['name', 'tradeprice', 'qty', 'amount']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'name', 'tradeprice', 'qty', 'amount'])
		// Optional: A list of footer labels.
		//foot: ['Total', '', '', '<code class="code">5</code>']
	};
</script>

<Table source={tableSimple} />
