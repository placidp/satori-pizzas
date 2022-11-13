import { useAppDispatch } from '../redux/store'
import { setSortTypeToggle } from '../redux/filter/slice'
import { SortType } from '../redux/filter/types'

export function useToggleSort() {
  const dispatch = useAppDispatch()

  function toggleSortIcon(SortType: SortType) {
    const sortIconReversed = SortType.includes('-') ? SortType.replace('-', '') : `-${SortType}`

    dispatch(setSortTypeToggle(sortIconReversed as SortType))
  }

  return { toggleSortIcon }
}
