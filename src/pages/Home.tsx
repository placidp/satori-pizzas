import { FC, useCallback, useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { selectPizzaData } from '../redux/pizza/selectors'
import { selectFilter } from '../redux/filter/selectors'
import { fetchPizzas } from '../redux/pizza/asyncActions'

import { Categories, Sort, Pagination, Skeleton, PizzaBlock } from '../components'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)

  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, [])

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const orderBy = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const searchBy = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        sortBy,
        orderBy,
        category,
        searchBy,
        currentPage: String(currentPage),
      })
    )
  }

  // if there was first render => requesting pizzas
  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />)
  const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeleton : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onPageChange} />
    </div>
  )
}

export default Home
