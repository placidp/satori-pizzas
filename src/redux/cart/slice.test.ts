import cart, { addItem, clearItems } from './slice'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { CartItem, CartSliceState } from './types'

const initialState: CartSliceState = getCartFromLS()

describe('cartSlice', () => {
  const cartItem: CartItem = {
    id: '1',
    name: 'Пепперони',
    price: 100,
    imageUrl: 'urlToPizza',
    type: '1',
    size: 1,
    count: 1,
  }

  it('should return default state when passed an empty action', () => {
    const result = cart(initialState, { type: '' })

    expect(result).toEqual(initialState)
  })

  it('should change total price with "addItem" action', () => {
    const action = { type: addItem.type, payload: cartItem }

    const result = cart(initialState, action)

    expect(result.totalPrice).toBe(100)
  })

  it('should add new item with "addItem" action', () => {
    const action = { type: addItem.type, payload: cartItem }

    const result = cart(initialState, action)

    expect(result.items[0]).toEqual(cartItem)
  })

  it('should clear items from cart with "clearItems" action', () => {
    const action = { type: clearItems.type }

    const result = cart(initialState, action)

    expect(result.items).toEqual([])
    expect(result.totalPrice).toBe(0)
  })
})
