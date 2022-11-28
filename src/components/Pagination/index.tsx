import { FC } from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number
  onChangePage: (page: number) => void
  itemsLength: number
}

const itemsPerPage = 8

export const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage, itemsLength = 1 }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel='...'
    nextLabel='>'
    previousLabel='<'
    onPageChange={e => onChangePage(e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={Math.ceil(itemsLength / itemsPerPage)}
    forcePage={currentPage - 1}
  />
)
