import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recommendapi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_RECOMMEND_API }),
	reducerPath: 'Api',
	tagTypes: ['RandomUserItems', 'UserIdItems'],
	endpoints: (build) => ({
		getRandomuserItems: build.query({
			query: () => 'getitemlistforeachuser',
			providesTags: ['RandomUserItems'],
		}),
	}),
});

export const { useGetRandomuserItemsQuery } = recommendapi;
