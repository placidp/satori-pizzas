import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pizza, PizzaSliceState, Status } from './types'
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
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
