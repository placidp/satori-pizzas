import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

import { list } from '../components/Sort'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMounted = React.useRef(false)
  const isSearch = React.useRef(false)

  const { items, status } = useSelector(state => state.pizza)
  const { categoryId, sort, currentPage } = useSelector(state => state.filter)
  const { searchField } = React.useContext(SearchContext)

  const onChangeCategory = i => {
    dispatch(setCategoryId(i))
  }

  const onPageChange = number => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const orderBy = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const searchBy = searchField ? `&search=${searchField}` : ''

    dispatch(
      fetchPizzas({
        sortBy,
        orderBy,
        category,
        searchBy,
        currentPage,
      })
    )
  }

  // if we changed params and there was first render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, searchField, currentPage])

  // if first render => checking url params and saving them in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [])

  // if there was first render => requesting pizzas
  React.useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchField, currentPage])

  const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />)
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
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
