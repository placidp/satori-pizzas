import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { category, sortBy, orderBy, searchBy, currentPage } = params
  const { data } = await axios.get(
    `https://628b53177886bbbb37b5a7c5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}${searchBy}`
  )

  if (data.length === 0) {
    return thunkAPI.rejectWithValue('Пиццы пустые')
  }

  return thunkAPI.fulfillWithValue(data)
})

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log(action, 'fulfilled')
      state.status = 'success'
      state.items = action.payload
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log(action, 'rejected')
      state.status = 'error'
      state.items = []
    },
  },
})

export const selectPizzaData = state => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
