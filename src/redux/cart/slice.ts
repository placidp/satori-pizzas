import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { CartItem, CartSliceState } from './types'

const initialState: CartSliceState = getCartFromLS()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find(obj => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        )
      })

      foundItem
        ? foundItem.count++
        : state.items.push({
            ...action.payload,
            count: 1,
          })

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find(obj => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        )
      })

      if (foundItem) {
        foundItem.count--
        state.totalPrice -= foundItem.price
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
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
