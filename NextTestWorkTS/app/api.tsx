import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { myProdInter } from './apiInterface'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/products' }),
  reducerPath: 'myApi',
  endpoints: (build) => ({
    getFullApi: build.query<myProdInter, string>({
      query: (products) => `/${[]}`,
    }),
  }),
})

export const { useGetFullApiQuery } = api
