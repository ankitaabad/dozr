import { get, readable, writable, type Writable } from 'svelte/store';
import { dozerRest } from './utils';
import { DateTime } from 'luxon';
export const isManager = writable(false);
export const customerId = writable(0);
import { backOff } from 'exponential-backoff';

function storeRefresh() {}

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
			$order_by: { date: 'desc' }
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
			url: '/stocks/query'
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

function createCustomerBalanceStore() {
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
			url: '/customer_balance/query',
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
export const customersBalanceStore = createCustomerBalanceStore();

function getStoreDozerId(store: Writable<any>) {
	const data = get(store);

	return data?.[0]?.['__dozer_record_id'];
}

const storeMap = {
	recentTransactionsStore,
	customersStore,
	customersBalanceStore
};
type StoreNames = keyof typeof storeMap;

export function refreshDozerStores(...storeNames: StoreNames[]) {
	async function refreshStore(s: StoreNames) {
		const store = storeMap[s];
		let id = getStoreDozerId(store);
		console.log({ refreshId: id });
		if (!id) {
			return;
		}

		backOff(
			async () => {
				console.log('comparing ', id, getStoreDozerId(store));
				switch (s) {
					case 'customersBalanceStore': {
						const oldBalance = get(store)?.[0]?.['balance'];
						await store.fetchData();
						const newBalance = get(store)?.[0]?.['balance'];
						if (oldBalance === newBalance) {
							throw Error('throwing for retry');
						}
						break;
					}
					default:
            await store.fetchData();

						if (id === getStoreDozerId(store)) {
							throw Error('throwing for retry');
						}
				}
			},
			{
				delayFirstAttempt: true,
				numOfAttempts: 3,
				startingDelay: 30
			}
		);
	}
	storeNames.forEach((s) => refreshStore(s));
}
