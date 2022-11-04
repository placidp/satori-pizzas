import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice'
import cart from './cart/slice'
import { itemsApi } from './itemsApi'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

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
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
