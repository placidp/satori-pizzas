import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSortType } from '../redux/filter/slice'
import { selectSort } from '../redux/filter/selectors'
import { SortPropertyEnum } from '../redux/filter/types'

// ! needs refactoring
export function useToggleSort() {
  const [sorted, setSorted] = useState({
    sortName: 'цене',
    sortProperty: SortPropertyEnum.RATING_ASC,
    reversed: false,
  })
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)

  function toggleSortIcon() {
    switch (sort.sortProperty) {
      case SortPropertyEnum.PRICE_ASC:
        setSorted({
          sortName: 'цене',
          sortProperty: SortPropertyEnum.PRICE_DESC,
          reversed: !sorted.reversed,
        })

        dispatch(setSortType({ name: 'цене', sortProperty: SortPropertyEnum.PRICE_DESC }))

        break

      case SortPropertyEnum.PRICE_DESC:
        setSorted({
          sortName: 'цене',
          sortProperty: SortPropertyEnum.PRICE_ASC,
          reversed: !sorted.reversed,
        })
        dispatch(setSortType({ name: 'цене', sortProperty: SortPropertyEnum.PRICE_ASC }))
        break

      case SortPropertyEnum.NAME_DESC:
        setSorted({
          sortName: 'алфавиту',
          sortProperty: SortPropertyEnum.NAME_ASC,
          reversed: !sorted.reversed,
        })
        dispatch(setSortType({ name: 'алфавиту', sortProperty: SortPropertyEnum.NAME_ASC }))
        break

      case SortPropertyEnum.NAME_ASC:
        setSorted({
          sortName: 'алфавиту',
          sortProperty: SortPropertyEnum.NAME_DESC,
          reversed: !sorted.reversed,
        })
        dispatch(setSortType({ name: 'алфавиту', sortProperty: SortPropertyEnum.NAME_DESC }))
        break

      case SortPropertyEnum.RATING_DESC:
        setSorted({
          sortName: 'популярности',
          sortProperty: SortPropertyEnum.RATING_ASC,
          reversed: !sorted.reversed,
        })
        dispatch(setSortType({ name: 'популярности', sortProperty: SortPropertyEnum.RATING_ASC }))
        break

      case SortPropertyEnum.RATING_ASC:
        setSorted({
          sortName: 'популярности',
          sortProperty: SortPropertyEnum.RATING_DESC,
          reversed: !sorted.reversed,
        })
        dispatch(setSortType({ name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC }))
        break

      default:
        setSorted({
          sortName: 'цене',
          sortProperty: SortPropertyEnum.PRICE_ASC,
          reversed: !sorted.reversed,
        })
        dispatch(setSortType({ name: 'цене', sortProperty: SortPropertyEnum.PRICE_ASC }))
        break
    }
  }

  return { sorted, toggleSortIcon }
}
