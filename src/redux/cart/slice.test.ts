import cart, { addItem, clearItems, minusItem, removeItem } from './slice'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { CartItem, CartSliceState } from './types'
import { configureStore } from '@reduxjs/toolkit'

const initialState: CartSliceState = getCartFromLS()

describe('cartSlice', () => {
  const cartItems = [
    {
      id: '1',
      name: 'Пепперони',
      price: 100,
      imageUrl: 'urlToPizza1',
      type: '1',
      size: 1,
      count: 1,
    },
    {
      id: '2',
      name: 'Маргарита',
      price: 200,
      imageUrl: 'urlToPizza2',
      type: '2',
      size: 2,
      count: 2,
    },
  ]
  const cartItem: CartItem = {
    id: '1',
    name: 'Пепперони',
    price: 100,
    imageUrl: 'urlToPizza',
    type: '1',
    size: 1,
    count: 1,
  }

  const store = configureStore({
    reducer: cart,
    preloadedState: {
      items: cartItems,
      totalPrice: 500,
    },
  })

  const state = {
    items: [{ ...cartItem, count: 2 }],
    totalPrice: 200,
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

  it('should decrement the count of the item with "minusItem" action', () => {
    const action = { type: minusItem.type, payload: cartItem }

    const result = cart(state, action)

    expect(result.items[0].count).toEqual(1)
    expect(result.items[0].price).toBe(100)
  })

  it('should clear items from cart with "clearItems" action', () => {
    const action = { type: clearItems.type }

    const result = cart(initialState, action)

    expect(result.items).toEqual([])
    expect(result.totalPrice).toBe(0)
  })

  it('should correctly update the totalPrice when an item is added', () => {
    const newItem = {
      id: '3',
      name: 'Крейзи пепперони',
      price: 300,
      imageUrl: 'urlToPizza3',
      type: '3',
      size: 3,
      count: 1,
    }

    store.dispatch(addItem(newItem))

    const expectedTotalPrice = 500 + newItem.price
    expect(store.getState().totalPrice).toBe(expectedTotalPrice)
  })

  it('should correctly update the totalPrice when an item is removed', () => {
    const itemToRemove = {
      id: '3',
      name: 'Крейзи пепперони',
      price: 300,
      imageUrl: 'urlToPizza3',
      type: '3',
      size: 3,
      count: 1,
    }

    store.dispatch(removeItem(itemToRemove))

    const expectedTotalPrice = 500

    expect(store.getState().totalPrice).toEqual(expectedTotalPrice)
  })
})
