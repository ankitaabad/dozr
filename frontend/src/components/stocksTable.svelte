<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	const sourceData = [
		{
			position: 1,
			company: 'Lorem Ipsum',
			marketprice: 9.15,
			closeprice: '100',
			marketcap: '915',
			buy: ''
		},
		{
			position: 2,
			company: 'Lorem Ipsum',
			marketprice: 9.15,
			closeprice: '100',
			marketcap: '915',
			buy: ''
		},
		{
			position: 3,
			company: 'Lorem Ipsum',
			marketprice: 9.15,
			closeprice: '100',
			marketcap: '915',
			buy: ''
		},
		{
			position: 4,
			company: 'Lorem Ipsum',
			marketprice: 9.15,
			closeprice: '100',
			marketcap: '915',
			buy: ''
		},
		{
			position: 5,
			company: 'Lorem Ipsum',
			marketprice: 9.15,
			closeprice: '100',
			marketcap: '915',
			buy: ''
		}
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Company', 'Market Price', 'Close Price', 'Market Cap (Cr)', 'Buy'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['company', 'marketprice', 'closeprice', 'marketcap', '']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, [
			'position',
			'company',
			'marketprice',
			'closeprice',
			'marketcap',
			''
		])
		// Optional: A list of footer labels.
		//foot: ['Total', '', '', '<code class="code">5</code>']
	};
</script>

<Table source={tableSimple} />
