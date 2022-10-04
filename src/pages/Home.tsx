import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'

import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice'
import { SearchPizzaParams } from '../redux/pizza/slice'

import { Categories, Sort, Pagination, Skeleton, PizzaBlock } from '../components'

import { sortList } from '../components/Sort'
import { selectPizzaData } from '../redux/pizza/selectors'
import { selectFilter } from '../redux/filter/selectors'
import { fetchPizzas } from '../redux/pizza/asyncActions'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isMounted = React.useRef(false)
  const isSearch = React.useRef(false)

  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

  const onChangeCategory = React.useCallback((idx: number) => {
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
  React.useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />)
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

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
