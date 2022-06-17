import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'

import { sortList } from '../components/Sort'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isMounted = React.useRef(false)
  const isSearch = React.useRef(false)

  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx))
  }

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

  // if we changed params and there was first render
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     })

  //     navigate(`?${queryString}`)
  //   }
  //   isMounted.current = true
  // }, [categoryId, sort.sortProperty, searchValue, currentPage])

  // if first render => checking url params and saving them in redux
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
  //     const sortObj = sortList.find(obj => obj.sortProperty === params.sortBy)

  //     dispatch(
  //       setFilters({
  //         searchValue: params.searchBy,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sortObj || sortList[0],
  //       })
  //     )
  //     isSearch.current = true
  //   }
  // }, [])

  // if there was first render => requesting pizzas
  React.useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((item: any) => <PizzaBlock {...item} />)
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
