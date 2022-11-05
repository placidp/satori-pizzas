import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

import MainLayout from './layouts/MainLayout'
import './scss/app.scss'
import { BasicSkeleton } from './components/BasicSkeleton'

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route
          path='/cart'
          element={
            <Suspense fallback={<BasicSkeleton />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='/pizza/:id'
          element={
            <Suspense fallback={<BasicSkeleton />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<BasicSkeleton />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
