import { RootState } from '../store'

export const selectCart = (state: RootState) => state.cart

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find(obj => obj.id === id)

export const selectCartItemByIdTypeSize =
  (id: string, type: string, size: number) => (state: RootState) =>
    state.cart.items.find(obj => obj.id === id && obj.type === type && obj.size === size)
