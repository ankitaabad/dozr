import { get } from 'svelte/store';
import { customerId, refreshDozerStores } from './store';
import { server } from './utils';

export async function addMoneyApi(amount) {
	console.log('inside add money api');
	const data = JSON.stringify({
		amount: Number(amount)
	});
	const customer_id = get(customerId);
	const config = {
		method: 'put',
		url: `customers/${customer_id}/addMoney`,

		data: data
	};

	await server(config)
		.then(async (response) => {
			console.log('added the money');
			refreshDozerStores('recentTransactionsStore', 'customerBalanceStore');
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function buyStocksApi(stock_id, quantity, company_name) {
	console.log('inside buy stocks api');
	const data = JSON.stringify({
		quantity: Number(quantity),
		company_name,
		customer_id: get(customerId)
	});
	const config = {
		method: 'put',
		url: `stocks/${stock_id}/buy`,

		data: data
	};

	await server(config)
		.then(async (response) => {
			console.log('bought the stocks, refreshing other data');
			refreshDozerStores(
				'recentTransactionsStore',
				'customerBalanceStore',
				'customerStockInvestmentValueStore',
				'customerTotalInvestmentValueStore'
			);
		})
		.catch((error) => {
			console.log(error);
		});
}


export async function sellStocksApi(stock_id, quantity, company_name) {
	console.log('inside sell stocks api');
	const data = JSON.stringify({
		quantity: Number(quantity),
		company_name,
		customer_id: get(customerId)
	});
	const config = {
		method: 'put',
		url: `stocks/${stock_id}/buy`,

		data: data
	};

	await server(config)
		.then(async (response) => {
			console.log('sold the stocks, refreshing other data');
			refreshDozerStores(
				'recentTransactionsStore',
				'customerBalanceStore',
				'customerStockInvestmentValueStore',
				'customerTotalInvestmentValueStore'
			);
		})
		.catch((error) => {
			console.log(error);
		});
}