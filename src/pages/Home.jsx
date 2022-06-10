import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'

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
  const { categoryId, sort, currentPage } = useSelector(state => state.filter)

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const { searchField } = React.useContext(SearchContext)

  const onChangeCategory = i => {
    dispatch(setCategoryId(i))
  }

  const onPageChange = number => {
    dispatch(setCurrentPage(number))
  }

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
    }
  }, [])

  React.useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const orderBy = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const searchBy = searchField ? `&search=${searchField}` : ''

    axios
      .get(
        `https://628b53177886bbbb37b5a7c5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}${searchBy}`
      )
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchField, currentPage])

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    })

    navigate(`?${queryString}`)
  }, [categoryId, sort.sortProperty, currentPage])

  const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />)
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onPageChange} />
    </div>
  )
}
export default Home
