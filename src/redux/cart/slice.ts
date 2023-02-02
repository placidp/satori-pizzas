import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { findItemInCart } from '../../utils/findItemInCart'
import { CartItem, CartSliceState } from './types'

const initialState: CartSliceState = getCartFromLS()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const foundItem = findItemInCart(state, action.payload)

      foundItem
        ? foundItem.count++
        : state.items.push({
            ...action.payload,
            count: 1,
          })

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const foundItem = findItemInCart(state, action.payload)

      if (foundItem) {
        foundItem.count--
        state.totalPrice -= foundItem.price
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(obj => {
        return (
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
        )
      })

      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
