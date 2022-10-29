import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SearchPizzaParams } from './slice'
import { Pizza } from './types'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async params => {
    const { category, sortBy, orderBy, searchBy, currentPage } = params
    const { data } = await axios.get<Pizza[]>(
      `https://628b53177886bbbb37b5a7c5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}${searchBy}`
    )

    return data
  }
)
