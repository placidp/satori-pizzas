import { createSlice } from '@reduxjs/toolkit'
import { PizzaSliceState, Status } from './types'
import { fetchPizzas } from './asyncActions'

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

export type SearchPizzaParams = {
  sortBy: string
  category: string
  orderBy: string
  searchBy: string
  currentPage: string
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })

    builder.addCase(fetchPizzas.rejected, state => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export default pizzaSlice.reducer
