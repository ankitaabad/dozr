import { get, readable, writable } from 'svelte/store';
import { dozerRest } from './utils';
import { DateTime } from 'luxon';
export const isManager = writable(false);
export const customerId = writable(0);

function createRecentTransactions() {
	const { subscribe, set, update } = writable([]);
	async function fetchData() {
		const cid = get(customerId);
		console.log({ cid });
		const data = JSON.stringify({
			$limit: 10,
			$filter: {
				customer_id: cid
			},
      $order_by:{date:"desc"}
		});

		const config = {
			method: 'post',
			url: '/recent_transactions/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating recent transactino store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createDailyStockGainers() {
	const { subscribe, set, update } = writable([]);
	async function fetchData() {
		const data = JSON.stringify({
			$order_by: { daily_change: 'desc' },
			$limit: 10,
			$filter: { date: '2023-11-28' }
		});
		// "$filter": {"date":DateTime.now().toSQLDate()}

		const config = {
			method: 'post',
			url: '/dailyStocks/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating top stock gainers store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createCustomersStore() {
	const { subscribe, set, update } = writable([]);
	
	async function fetchData() {
    const cid = get(customerId);
	console.log({ cid });
		let data = JSON.stringify({
			$filter: {
				customer_id: cid
			}
		});

		const config = {
			method: 'post',
			url: '/customers/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating customers store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createAllStocksStore() {
	const { subscribe, set, update } = writable([]);
	
	async function fetchData() {
    const cid = get(customerId);
	console.log({ cid });
		

		const config = {
			method: 'post',
			url: '/stocks/query',
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating stocks store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function creaeCustomerStocksStore() {
	const { subscribe, set, update } = writable([]);
	
	async function fetchData() {
    const cid = get(customerId);
	console.log({ cid });
		let data = JSON.stringify({
			$filter: {
				customer_id: cid
			}
		});

		const config = {
			method: 'post',
			url: '/customer_stocks/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating customers_stocks store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

export const recentTransactionsStore = createRecentTransactions();
export const topStockGainersStore = createDailyStockGainers();
export const customersStore = createCustomersStore();
export const allStocksStore = createAllStocksStore();
export const customersStocksStore = creaeCustomerStocksStore();
