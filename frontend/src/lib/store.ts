import { get, writable, type Writable } from 'svelte/store';
import { dozerRest } from './utils';
export const isManager = writable(false);
export const customerId = writable(0);
import { backOff } from 'exponential-backoff';
import { DateTime } from 'luxon';


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
			$filter: { date: DateTime.now().toSQLDate() }
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
function createDailyStockLosers() {
	const { subscribe, set, update } = writable([]);
	async function fetchData() {
		const data = JSON.stringify({
			$order_by: { daily_change: 'asc' },
			$limit: 10,
			$filter: { date: DateTime.now().toSQLDate() }
		});
		// "$filter": {"date":DateTime.now().toSQLDate()}

		const config = {
			method: 'post',
			url: '/dailyStocks/query',
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
 

	return { subscribe, set, update, fetchData,getInitials };
}

export function getInitials() {
  const customer = get(customersStore)
  console.log("getinitials called",customer)

  customer[0].first_name[0] + customer[0].last_name[0]
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
			url: '/mutual_funds/query',
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
export const recentTransactionsStore = createRecentTransactions();
export const topStockGainersStore = createDailyStockGainers();
export const topStockLosersStore = createDailyStockLosers()
export const customersStore = createCustomersStore();
export const allStocksStore = createAllStocksStore();
export const allMutualFundsStore = creatAllMutualFundsStore();

export const customersStocksStore = creaeCustomerStocksStore();
export const customerBalanceStore = createCustomerBalanceStore();
export const customerMutualFundsStore = createCustomerMutualFundsStore();
export const loansStore = createLoansStore();
export const customerStockInvestmentValueStore = creatCustomerStockInvestmentValueStore()
export const customerMFInvestmentValueStore = creatCustomerMFInvestmentValueStore()
export const customerTotalInvestmentValueStore = creatCustomerTotalInvestmentValueStore()


function getStoreDozerId(store: Writable<any>) {
	const data = get(store);

	return data?.[0]?.['__dozer_record_id'];
}

const storeMap = {
	recentTransactionsStore,
	customersStore,
	customerBalanceStore,
	customerMutualFundsStore
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
					case 'customerBalanceStore': {
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
				startingDelay: 80
			}
		);
	}
	storeNames.forEach((s) => refreshStore(s));
}
