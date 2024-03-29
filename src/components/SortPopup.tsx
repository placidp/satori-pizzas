import { FC, memo, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { useToggleSort } from '../hooks/useToggleSort'
import { setSortType } from '../redux/filter/slice'
import { Sort, SortType } from '../redux/filter/types'

type SortItem = {
  name: string
  SortType: SortType
}

type SortPopupProps = {
  value: Sort
}

export const sortList: SortItem[] = [
  { name: 'цене', SortType: SortType.PRICE_ASC },
  { name: 'алфавиту', SortType: SortType.NAME_ASC },
  { name: 'популярности', SortType: SortType.RATING_ASC },
]

export const SortPopup: FC<SortPopupProps> = memo(({ value }) => {
  const dispatch = useAppDispatch()
  const sortRef = useRef<HTMLSpanElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const { toggleSortIcon } = useToggleSort()

  const onClickSortItem = (obj: SortItem) => {
    dispatch(setSortType(obj))
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])
  return (
    <div className='sort'>
      <div className='sort__label'>
        <b>Сортировка по:</b>
        <svg
          onClick={() => toggleSortIcon(value.SortType)}
          className={!value.SortType.includes('-') ? 'reversed' : ''}
          width='15'
          height='9'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          ></path>
        </svg>
        <span ref={sortRef} onClick={() => setIsOpen(!isOpen)}>
          {value.name}
        </span>
      </div>
      {isOpen && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickSortItem(obj)}
                className={value.name === obj.name ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})
