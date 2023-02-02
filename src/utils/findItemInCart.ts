import { CartItem, CartSliceState } from '../redux/cart/types'

export function findItemInCart(state: CartSliceState, cartItem: CartItem) {
  return state.items.find(obj => {
    return obj.id === cartItem.id && obj.size === cartItem.size && obj.type === cartItem.type
  })
}
