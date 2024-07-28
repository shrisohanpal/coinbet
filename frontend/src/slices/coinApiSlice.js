import { COIN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const coinApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoin: builder.query({
      query: () => ({
        url: COIN_URL
      }),
    }),
  }),
});

export const { useGetCoinQuery } = coinApiSlice;