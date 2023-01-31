import { cleanup } from '@testing-library/react'
import { RootState } from '../store'
import { selectCart, selectCartItemByIdTypeSize } from './selectors'
import { CartItem, CartSliceState } from './types'

afterEach(() => {
  cleanup()
})

// mock cart item
const cartItem: CartItem = {
  id: '1',
  name: 'Пепперони',
  price: 100,
  imageUrl: 'urlToPizza',
  type: '1',
  size: 1,
  count: 1,
}

// mock cart state
const cart: CartSliceState = {
  items: [cartItem],
  totalPrice: 0,
}

describe('Cart selectors', () => {
  it('"selectCart" should return state.cart', () => {
    const result = selectCart({ cart } as RootState)
    expect(result).toEqual(cart)
  })

  it('"selectCartItemByIdTypeSize" should return an item with the correct id, type and size', () => {
    const result = selectCartItemByIdTypeSize(
      cartItem.id,
      cartItem.type,
      cartItem.size
    )({ cart } as RootState)

    expect(result).toEqual(cartItem)
  })
})
