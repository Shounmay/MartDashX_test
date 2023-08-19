import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
	reducerPath: 'adminApi',
	tagTypes: [
		'User',
		'Products',
		'Customers',
		'Transactions',
		'Transaction',
		'CountryStat',
		'Sales',
		'Admins',
		'Performance',
		'Dashboard',
	],
	endpoints: (build) => ({
		getUser: build.query({
			query: (id) => `general/user/${id}`,
			providesTags: ['User'],
		}),
		getProducts: build.query({
			query: () => 'client/products',
			providesTags: ['Products'],
		}),
		getCustomers: build.query({
			query: () => 'client/customers',
			providesTags: ['Customers'],
			invalidatesTags: ['Transactions'],
		}),
		getTransactions: build.query({
			query: ({ page, pageSize, sort, search }) => ({
				url: 'client/transactions',
				method: 'GET',
				params: { page, pageSize, sort, search },
			}),

			providesTags: ['Transactions'],
		}),
		getTransactionsDetail: build.query({
			query: ({ page, pageSize, sort, search }) => ({
				url: 'client/transactiondetails',
				method: 'GET',
				params: { page, pageSize, sort, search },
			}),

			providesTags: ['Transaction'],
		}),
		getCountryStats: build.query({
			query: () => 'client/diverseStat',
			providesTags: ['CountryStat'],
		}),
		getSales: build.query({
			query: () => 'sales/sales',
			providesTags: ['Sales'],
		}),
		getAdmins: build.query({
			query: () => 'management/admins',
			providesTags: ['Admins'],
		}),
		getPerformance: build.query({
			query: (id) => `management/performance/${id}`,
			providesTags: ['Performance'],
		}),
		getDashboard: build.query({
			query: () => 'general/dashboard',
			providesTags: ['Dashboard'],
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetProductsQuery,
	useGetCustomersQuery,
	useGetTransactionsQuery,
	useGetTransactionsDetailQuery,
	useGetCountryStatsQuery,
	useGetSalesQuery,
	useGetAdminsQuery,
	useGetPerformanceQuery,
	useGetDashboardQuery,
} = api;
