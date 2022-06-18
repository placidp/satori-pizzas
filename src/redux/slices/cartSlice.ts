import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { RootState } from '../store'
import { calcTotalPrice } from '../../utils/calcTotalPrice'

export type CartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}

const { items, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find(obj => obj.id === action.payload.id)

      if (foundItem) {
        foundItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const foundItem = state.items.find(obj => obj.id === action.payload)

      if (foundItem) {
        foundItem.count--
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum
        }, 0)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
