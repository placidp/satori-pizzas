import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pizza } from './pizza/types'
import { SearchPizzaParams } from './pizza/types'

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://628b53177886bbbb37b5a7c5.mockapi.io/' }),
  endpoints: build => ({
    getItems: build.query<Pizza[], SearchPizzaParams>({
      query: ({ currentPage, category, sortBy, orderBy, searchBy }) =>
        `items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${orderBy}${searchBy}`,
    }),
  }),
})

export const { useGetItemsQuery } = itemsApi
