import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [categoryId, setCategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProp: 'rating',
  })

  React.useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sortType.sortProp.replace('-', '')
    const orderBy = sortType.sortProp.includes('-') ? 'asc' : 'desc'

    fetch(
      `https://628b53177886bbbb37b5a7c5.mockapi.io/items?${category}&sortBy=${sortBy}&order=${orderBy}`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={i => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={i => setSortType(i)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map(item => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  )
}
export default Home
