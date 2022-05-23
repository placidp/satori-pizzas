import React from 'react'

import Header from '../src/components/Header'
import Categories from '../src/components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'
import Skeleton from './components/PizzaBlock/Skeleton'

import './scss/app.scss'

function App() {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://628b53177886bbbb37b5a7c5.mockapi.io/items')
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className='App'>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              {/* <Categories /> */}
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              {isLoading
                ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                : items.map(item => <PizzaBlock key={item.id} {...item} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
