import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, SortType } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'цене',
    SortType: SortType.PRICE_ASC,
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setSortTypeToggle(state, action: PayloadAction<SortType>) {
      state.sort.SortType = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
})

export const { setCategoryId, setSearchValue, setSortType, setSortTypeToggle, setCurrentPage } =
  filterSlice.actions

export default filterSlice.reducer
