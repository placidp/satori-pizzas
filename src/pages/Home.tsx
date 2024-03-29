import { FC, useCallback } from 'react'
import { useGetItemsByCategoryQuery, useGetItemsQuery } from '../redux/itemsApi'

import { useAppSelector } from '../redux/store'
import { useAppDispatch } from '../redux/store'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { selectFilter } from '../redux/filter/selectors'

import { Categories, SortPopup, Pagination, Skeleton, PizzaBlock } from '../components'

const Home: FC = () => {
  const dispatch = useAppDispatch()

  const { categoryId, sort, currentPage, searchValue } = useAppSelector(selectFilter)

  const sortBy = sort.SortType.replace('-', '')
  const orderBy = sort.SortType.includes('-') ? 'asc' : 'desc'
  const category = categoryId > 0 ? `category=${categoryId}` : ''
  const searchBy = searchValue ? `&search=${searchValue}` : ''

  // get items by our query / filters
  const {
    data = [],
    isLoading,
    isError,
  } = useGetItemsQuery({
    sortBy,
    orderBy,
    category,
    searchBy,
    currentPage: String(currentPage),
  })

  // get all items
  const { data: dataByCategory = [] } = useGetItemsByCategoryQuery({
    sortBy,
    orderBy,
    category,
    searchBy,
    currentPage: String(currentPage),
  })

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
    dispatch(setCurrentPage(1))
  }, [])

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page))
    window.scrollTo(0, 0)
  }

  const pizzas = data.map((item: any) => <PizzaBlock key={item.id} {...item} />)
  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {isError ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className='content__items'>{isLoading ? skeleton : pizzas}</div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={onPageChange}
        itemsLength={dataByCategory.length}
      />
    </div>
  )
}

export default Home
