import { RootState } from '../store'
import { selectFilter, selectSort } from './selectors'
import { FilterSliceState, SortType } from './types'

// mock filter state
const filter: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'цене',
    SortType: SortType.PRICE_ASC,
  },
}

describe('Filter selectors', () => {
  it('"selectFilter" should return state.filter', () => {
    const result = selectFilter({ filter } as RootState)
    expect(result).toEqual(filter)
  })

  it('"selectSort" should return sort object with name and SortType properties', () => {
    const result = selectSort({ filter } as RootState)

    expect(result).toEqual(filter.sort)
  })
})
