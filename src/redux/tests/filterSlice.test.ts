import filter, {
  setCategoryId,
  setSearchValue,
  setSortType,
  setSortTypeToggle,
  setCurrentPage,
} from '../filter/slice'
import { SortType } from '../filter/types'

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'цене',
    SortType: SortType.PRICE_ASC,
  },
}

describe('filterSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = filter(initialState, { type: '' })

    expect(result).toEqual(initialState)
  })

  it('should set category id with "setCategoryId" action', () => {
    const action = { type: setCategoryId.type, payload: 1 }

    const result = filter(initialState, action)

    expect(result.categoryId).toBe(1)
  })

  it('should update search value with "setSearchValue" action', () => {
    const action = { type: setSearchValue.type, payload: 'Пепперони' }

    const result = filter(initialState, action)

    expect(result.searchValue).toBe('Пепперони')
  })

  it('should change sort name and sort type with "setSortType" action', () => {
    const action = {
      type: setSortType.type,
      payload: { name: 'популярности', SortType: SortType.NAME_ASC },
    }

    const result = filter(initialState, action)

    expect(result.sort).toEqual({ name: 'популярности', SortType: SortType.NAME_ASC })
  })

  it('should toggle sort type with "setSortTypeToggle" action', () => {
    const action = {
      type: setSortTypeToggle.type,
      payload: SortType.PRICE_ASC,
    }

    const result = filter(initialState, action)

    expect(result.sort.SortType).toBe(SortType.PRICE_ASC)
  })

  it('should update page with "setCurrentPage" action', () => {
    const action = {
      type: setCurrentPage.type,
      payload: 3,
    }

    const result = filter(initialState, action)

    expect(result.currentPage).toBe(3)
  })
})
