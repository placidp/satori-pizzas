import { useDispatch } from 'react-redux'
import { setSortTypeToggle } from '../redux/filter/slice'
import { SortPropertyEnum } from '../redux/filter/types'

export function useToggleSort() {
  const dispatch = useDispatch()

  function toggleSortIcon(sortProperty: SortPropertyEnum) {
    const sortIconReversed = sortProperty.includes('-')
      ? sortProperty.replace('-', '')
      : `-${sortProperty}`

    dispatch(setSortTypeToggle(sortIconReversed as SortPropertyEnum))
  }

  return { toggleSortIcon }
}
