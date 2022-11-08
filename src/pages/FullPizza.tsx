import axios from 'axios'
import { useState, useEffect, FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useGetItemQuery } from '../redux/itemsApi'

import { selectCartItemById } from '../redux/cart/selectors'
import { useAppSelector } from '../redux/store'
// import { useAppSelector } from '../redux/store'

// import { Skeleton } from '../components'

// import {  } from '../redux/pizza/slice'

const FullPizza: FC = () => {
  // const pizzaSlice = useAppSelector(state => state.pizza)
  // console.log(`pizza slice`, pizzaSlice)

  // const hasPizza = useAppSelector(selectCartItemById)
  // console.log(test)

  // mocking info for now
  const pizzaTypes = ['тонкое', 'традиционное']
  const sizes = [26, 30, 40]
  const types = [0, 1]
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  //

  // const [pizza, setPizza] = useState<{
  //   imageUrl: string
  //   name: string
  //   price: number
  // }>()
  // console.log(`fetching pizzas`, pizza)

  const params = useParams<{ id?: string }>()
  const hasPizza = useAppSelector(state => state.cart.items.find(obj => obj.id === params.id))
  const addedCount = hasPizza?.count
  const navigate = useNavigate()
  const { data: pizza, isLoading } = useGetItemQuery(params.id ? params.id : '1')

  // console.log('pizza', pizza)

  const onClickAdd = () => {}

  // useEffect(() => {
  //   async function fetchPizza() {
  //     try {
  //       const { data } = await axios.get(
  //         'https://628b53177886bbbb37b5a7c5.mockapi.io/items/' + params.id
  //       )
  //       setPizza(data)
  //     } catch (error) {
  //       alert('Ошибка при получении пиццы')
  //       navigate('/')
  //     }
  //   }

  //   fetchPizza()
  // }, [])

  if (!pizza) {
    return (
      <>
        {/* Загрузка... */}
        {/* <Skeleton /> */}
      </>
    )
  }

  return (
    <div className='fullPizzaContainer'>
      <div className='pizza-block' style={{ width: '45%' }}>
        <a key={1}>
          <img
            className='pizza-block__image'
            style={{ width: '80%' }}
            src={pizza.imageUrl}
            alt='Pizza'
          />
        </a>
      </div>
      <div className='descriptionContainer'>
        <div className='composition'>
          <h4 className='pizza-block__title'>{pizza.name}</h4>
          <p>Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо</p>
          Состав:
          <p>
            Тесто дрожжевое, сыр моцарелла, соус томатный, сушеный базилик. <br />
            Пищевая ценность на 100 г.: Белки: 13.7 г. Жиры: 11.9 г. Углеводы: 38.4 г. <br />
            Энергетическая ценность: 315.9 ккал / 1320.7 кДж
          </p>
        </div>
        <div
          className='pizza-block__selector'
          style={{ width: '100%', alignItems: 'center', textAlign: 'center', padding: '8px' }}
        >
          <ul style={{ width: '100%' }}>
            {types.map(type => (
              <li
                key={type}
                onClick={() => setActiveType(type)}
                className={activeType === type ? 'active' : ''}
              >
                {pizzaTypes[type]}
              </li>
            ))}
          </ul>
          <ul style={{ width: '100%' }}>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom' style={{ width: '100%' }}>
          <div className='pizza-block__price'>от {pizza.price} ₽</div>
          <button
            onClick={onClickAdd}
            className='button button--outline button--add'
            style={{ width: '50%' }}
          >
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              ></path>
            </svg>
            <span>Добавить</span>
            {addedCount && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FullPizza
