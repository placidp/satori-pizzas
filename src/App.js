import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from '../src/components/Header'

import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './scss/app.scss'

export const SearchContext = React.createContext()

function App() {
  const [searchField, setSearchField] = React.useState('')

  return (
    <div className='wrapper'>
      <SearchContext.Provider value={{ searchField, setSearchField }}>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
