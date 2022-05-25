import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from '../src/components/Header'

import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './scss/app.scss'

function App() {
  const [searchField, setSearchField] = React.useState('')

  return (
    <div className='wrapper'>
      <Header searchField={searchField} setSearchField={setSearchField} />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
