import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

const Home = () => {
  const dispatch = useDispatch()
  const { categoryId, sort } = useSelector(state => state.filter)

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)

  const { searchField } = React.useContext(SearchContext)

  const onChangeCategory = i => {
    dispatch(setCategoryId(i))
  }

  React.useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const orderBy = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const searchBy = searchField ? `&search=${searchField}` : ''

    fetch(
      `https://628b53177886bbbb37b5a7c5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}${searchBy}`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
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
      <div className='content__items'>{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  )
}
export default Home
