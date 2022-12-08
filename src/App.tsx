import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

import MainLayout from './layouts/MainLayout'
import './scss/app.scss'
import { EmptyCartSkeleton } from './components/EmptyCartSkeleton'

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
            <Suspense fallback={<EmptyCartSkeleton />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='/pizza/:id'
          element={
            <Suspense
              fallback={
                <span
                  style={{
                    display: 'block',
                    padding: '140px 100px',
                    minWidth: '1400px',
                    minHeight: '486px',
                    margin: '0 auto',
                  }}
                ></span>
              }
            >
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense
              fallback={
                <span
                  style={{
                    display: 'block',
                    padding: '140px 100px',
                    minWidth: '1400px',
                    minHeight: '442px',
                    margin: '0 auto',
                  }}
                ></span>
              }
            >
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
