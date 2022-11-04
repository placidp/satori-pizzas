import { configureStore } from '@reduxjs/toolkit'
import { itemsApi } from './itemsApi'
import filter from './filter/slice'
import cart from './cart/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(itemsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
