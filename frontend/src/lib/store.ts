import { get, writable, type Writable } from 'svelte/store';
import { dozerRest } from './utils';
export const isManager = writable(false);
export const isHome = writable(false);
export const stockPage = writable(false);

export const customerId = writable(0);
export const currentStockId = writable('');
export const currentMFId = writable('');

import { backOff } from 'exponential-backoff';
import { DateTime } from 'luxon';

function createRecentTransactions() {
	const { subscribe, set, update } = writable([]);
	async function fetchData() {
		const cid = get(customerId);
		console.log({ cid });
		const data = JSON.stringify({
			$limit: 30,
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

function createStockDetailStore() {
	const { subscribe, set, update } = writable({ dailyPrices: [], details: {} });
	async function fetchData() {
		const data = JSON.stringify({
			$filter: {
				stock_id: get(currentStockId)
			},
			$limit: 367,
			$order_by: { date: 'desc' }
		});
		// "$filter": {"date":DateTime.now().toSQLDate()}

		const configPrice = {
			method: 'post',
			url: '/stocks_daily_price/query',
			data: data
		};
		const configDetail = {
			method: 'post',
			url: '/stocks/query',
			data: JSON.stringify({
				$filter: {
					stock_id: get(currentStockId)
				}
			})
		};

		Promise.all([
			dozerRest.request(configPrice).then((response) => {
				console.log({ price: response.data });
				update((x) => {
					x.dailyPrices = response.data;
					return x;
				});
			}),
			dozerRest.request(configDetail).then((response) => {
				console.log({ details: response.data });

				update((x) => {
					x.details = response.data?.[0];
					return x;
				});
			})
		]);
	}

	return { subscribe, set, update, fetchData };
}

function createMFDetailStore() {
	const { subscribe, set, update } = writable({ dailyPrices: [], details: {} });
	async function fetchData() {
		const data = JSON.stringify({
			$filter: {
				mf_id: get(currentMFId)
			},
			$limit: 367,
			$order_by: { date: 'desc' }
		});
		// "$filter": {"date":DateTime.now().toSQLDate()}

		const configPrice = {
			method: 'post',
			url: '/mf_daily_price/query',
			data: data
		};
		const configDetail = {
			method: 'post',
			url: '/mutual_funds/query',
			data: JSON.stringify({
				$filter: {
					mf_id: get(currentMFId)
				}
			})
		};

		Promise.all([
			dozerRest.request(configPrice).then((response) => {
				console.log({ price: response.data });
				update((x) => {
					x.dailyPrices = response.data;
					return x;
				});
			}),
			dozerRest.request(configDetail).then((response) => {
				console.log({ details: response.data });

				update((x) => {
					x.details = response.data?.[0];
					return x;
				});
			})
		]);
	}

	return { subscribe, set, update, fetchData };
}

function createDailyStockGainers() {
	const { subscribe, set, update } = writable([]);
	async function fetchData() {
		const data = JSON.stringify({
			$order_by: { daily_change: 'desc' },
			$limit: 10
		});
		// "$filter": {"date":DateTime.now().toSQLDate()}

		const config = {
			method: 'post',
			url: '/stocks/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating top stock gainers store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createDailyMFGainers() {
	const { subscribe, set, update } = writable([]);
	async function fetchData() {
		const data = JSON.stringify({
			$order_by: { daily_change: 'desc' },
			$limit: 10
		});
		// "$filter": {"date":DateTime.now().toSQLDate()}

		const config = {
			method: 'post',
			url: '/mutual_funds/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createDailyMFLosers() {
	const { subscribe, set, update } = writable([]);
	async function fetchData() {
		const data = JSON.stringify({
			$order_by: { daily_change: 'asc' },
			$limit: 10
		});
		// "$filter": {"date":DateTime.now().toSQLDate()}

		const config = {
			method: 'post',
			url: '/mutual_funds/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}
function createDailyStockLosers() {
	const { subscribe, set, update } = writable([]);
	async function fetchData() {
		const data = JSON.stringify({
			$order_by: { daily_change: 'asc' },
			$limit: 10
		});
		// "$filter": {"date":DateTime.now().toSQLDate()}

		const config = {
			method: 'post',
			url: '/stocks/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating top stock losers store');
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

	return { subscribe, set, update, fetchData, getInitials };
}

export function getInitials() {
	const customer = get(customersStore);
	console.log('getinitials called', customer);

	customer[0].first_name[0] + customer[0].last_name[0];
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

function createTopYearlyStocksStore() {
	const { subscribe, set, update } = writable([]);

	async function fetchData() {
		let data = JSON.stringify({
			$order_by: {
				yearly_change: 'desc'
			},
			$limit: 10
		});
		const config = {
			method: 'post',
			url: '/stocks/query',
			data
		};

		dozerRest.request(config).then((response) => {
			console.log('top stocks', response.data);
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createTopYearlyMFStore() {
	const { subscribe, set, update } = writable([]);

	async function fetchData() {
		let data = JSON.stringify({
			$order_by: {
				yearly_change: 'desc'
			},
			$limit: 10
		});
		const config = {
			method: 'post',
			url: '/mutual_funds/query',
			data
		};

		dozerRest.request(config).then((response) => {
			console.log('top MFs', response.data);
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
			console.log('before updating customers_balance store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}
function createCustomerMutualFundsStore() {
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
			url: '/customer_mutual_funds/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating customers_balance store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createLoansStore() {
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
			url: '/loans/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating customers_balance store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function creatAllMutualFundsStore() {
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
			url: '/mutual_funds/query'
			// data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating  mutual funds store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function creatCustomerMFInvestmentValueStore() {
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
			url: '/customer_mf_investment_value/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating  customermf_investment_value store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}
function creatCustomerTotalInvestmentValueStore() {
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
			url: '/customer_total_investment_value/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating  customer_total_investment_value store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createTopInvestorsStore() {
	const { subscribe, set, update } = writable([]);

	async function fetchData() {
		const cid = get(customerId);
		console.log({ cid });
		let data = JSON.stringify({
			$order_by: {
				total_investment: 'desc'
			},
			$limit: 10
		});

		const config = {
			method: 'post',
			url: '/top_investors/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}
function creatCustomerStockInvestmentValueStore() {
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
			url: '/customer_stock_investment_value/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			console.log('before updating  customer_stock_investment_value store');
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}

function createTaxLiabilityStore() {
	const { subscribe, set, update } = writable([]);

	async function fetchData() {
		const cid = get(customerId);
		console.log({ cid });
		let data = JSON.stringify({
			$filter: {
				customer_id: cid,
				year: DateTime.now().year
			}
		});

		const config = {
			method: 'post',
			url: '/tax_liability/query',
			data: data
		};

		dozerRest.request(config).then((response) => {
			update(() => response.data);
		});
	}

	return { subscribe, set, update, fetchData };
}
export const recentTransactionsStore = createRecentTransactions();
export const topStockGainersStore = createDailyStockGainers();
export const topStockLosersStore = createDailyStockLosers();
export const topMFGainersStore = createDailyMFGainers();
export const topMFLosersStore = createDailyMFLosers();

export const customersStore = createCustomersStore();
export const allStocksStore = createAllStocksStore();
export const allMutualFundsStore = creatAllMutualFundsStore();
export const topYearlyStock = createTopYearlyStocksStore();
export const topYearlyMF = createTopYearlyMFStore();

export const customersStocksStore = creaeCustomerStocksStore();
export const customerBalanceStore = createCustomerBalanceStore();
export const customerMutualFundsStore = createCustomerMutualFundsStore();
export const loansStore = createLoansStore();
export const customerStockInvestmentValueStore = creatCustomerStockInvestmentValueStore();
export const customerMFInvestmentValueStore = creatCustomerMFInvestmentValueStore();
export const customerTotalInvestmentValueStore = creatCustomerTotalInvestmentValueStore();
export const topInvestorsStore = createTopInvestorsStore();
export const stockDetailStore = createStockDetailStore();
export const mfDetailStore = createMFDetailStore();


export const taxLiabilityStore = createTaxLiabilityStore();
function getStoreDozerId(store: Writable<any>) {
	const data = get(store);

	return data?.[0]?.['__dozer_record_id'];
}

function getStoreFieldValue(store, fieldName) {
	const data = get(store);
	return data?.[0]?.[fieldName];
}

const storeMap = {
	recentTransactionsStore,
	customersStore,
	customerBalanceStore,
	customerStockInvestmentValueStore,
	customerMFInvestmentValueStore,
	customerTotalInvestmentValueStore,
	customersStocksStore,
	customerMutualFundsStore,
	taxLiabilityStore
};
type StoreNames = keyof typeof storeMap;

export function refreshDozerStores(...storeNames: StoreNames[]) {
	async function refreshStore(s: StoreNames) {
		// let startingDelay = [
		// 	'taxLiabilityStore',
		// 	'customerStockInvestmentValueStore',
		// 	'customerMFInvestmentValueStore',
		// 	'customerTotalInvestmentValueStore'
		// ].includes(s)
		// 	? 800
		// 	: 120;

		console.log({ s });
		const store = storeMap[s];
		let id = getStoreDozerId(store);

		console.log({ refreshId: id });
		// if (!id) {
		// 	return;
		// }

		backOff(
			async () => {
				console.log('comparing ', id, getStoreDozerId(store));
				switch (s) {
					case 'customerBalanceStore': {
						const oldBalance = getStoreFieldValue(store, 'balance');
						await store.fetchData();
						const newBalance = getStoreFieldValue(store, 'balance');
						if (oldBalance === newBalance) {
							throw Error('throwing for retry');
						}
						break;
					}
					case 'taxLiabilityStore': {
						console.log('refreshing tax liability');
						const oldltcg = getStoreFieldValue(store, 'ltcg');
						const oldstcg = getStoreFieldValue(store, 'stcg');

						await store.fetchData();
						const newltcg = getStoreFieldValue(store, 'ltcg');
						const newstcg = getStoreFieldValue(store, 'stcg');
						if (oldltcg + oldstcg === newltcg + newstcg) {
							throw Error(`throwing for retry ${s}`);
						}
						break;
					}
					default:
						await store.fetchData();

						if (id === getStoreDozerId(store)) {
							throw Error(`throwing for retry ${s}`);
						}
				}
			},
			{
				delayFirstAttempt: true,
				numOfAttempts: 3,
				startingDelay: 120
			}
		);
	}
	storeNames.forEach((s) => refreshStore(s));
}
