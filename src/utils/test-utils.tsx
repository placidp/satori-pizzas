import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import filter from '../redux/filter/slice'
import cart from '../redux/cart/slice'
import { itemsApi } from '../redux/itemsApi'

interface WrapperProps {
  children?: React.ReactNode
}

function render(ui: any, { route = '/', initialState = {} } = {}) {
  window.history.pushState({}, 'Test page', route)
  const store = configureStore({
    reducer: {
      filter,
      cart,
      [itemsApi.reducerPath]: itemsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(itemsApi.middleware),
    preloadedState: initialState,
  })

  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
