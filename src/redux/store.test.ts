import { itemsApi } from './itemsApi'
import filter from './filter/slice'
import cart from './cart/slice'

import { configureStore } from '@reduxjs/toolkit'
describe('store', () => {
  it('should have the correct reducer', () => {
    const store = configureStore({
      reducer: {
        filter,
        cart,
        [itemsApi.reducerPath]: itemsApi.reducer,
      },
      middleware: getDefaultMiddleware => getDefaultMiddleware().concat(itemsApi.middleware),
    })
    expect(store.getState().filter).toBeDefined()
    expect(store.getState().cart).toBeDefined()
    expect(store.getState()[itemsApi.reducerPath]).toBeDefined()
  })
})
