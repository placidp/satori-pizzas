import { useState, FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useGetItemQuery } from '../../redux/itemsApi'

import { selectCartItemByIdTypeSize } from '../../redux/cart/selectors'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { PizzaSizes } from '../../redux/pizza/types'
import { addItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'

import styles from './FullPizza.module.scss'

const pizzaTypes = ['тонкое', 'традиционное']

const FullPizza: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data: pizza, isLoading, isError } = useGetItemQuery(id || '1')

  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const sizes = pizza?.sizes ? pizza.sizes : [36, 40]
  const types = pizza?.types ? pizza.types : [0, 1]

  const hasItemInCart = useAppSelector(
    selectCartItemByIdTypeSize(id!, pizzaTypes[activeType], sizes[activeSize])
  )

  if (isLoading) {
    return <>Loading...</>
  }
  if (isError) {
    navigate('/')
    return <>Error</>
  }

  if (!pizza) {
    return <></>
  }

  console.log('pizza', pizza)

  const addedCount = hasItemInCart?.count

  const onClickAdd = () => {
    const item: CartItem = {
      id: pizza.id,
      name: pizza.name,
      price,
      imageUrl: pizza.imageUrl,
      type: pizzaTypes[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item))
  }

  // pizza types change price
  let price: number = pizza.prices.small!

  if (pizza.prices.medium && sizes[activeSize] === PizzaSizes.MEDIUM) {
    price = pizza.prices.medium
  } else if (pizza.prices.large && sizes[activeSize] === PizzaSizes.LARGE) {
    price = pizza.prices.large
  } else if (pizza.prices.small) {
    price = pizza.prices.small
  }

  return (
    <div className='fullPizzaContainer'>
      <div className='pizza-block'>
        <a key={1}>
          <img
            className='pizza-block__image'
            style={{ width: '80%' }}
            src={pizza.imageUrl}
            alt='Pizza'
          />
        </a>
      </div>
      <div className={styles.about}>
        <h2 className='pizza-block__title'>{pizza.name}</h2>
        <section className={styles.description}>
          <div className={styles.ingredients}>
            <h3>Состав</h3>
            <span>{pizza.ingredients}</span>
          </div>
          <h4>Пищевая ценность на 100 г</h4>
          <div className={styles.nutrients}>
            <div>
              <span>Энерг. ценность: </span>
              <span>Жиры: </span>
              <span>Белки: </span>
              <span>Углеводы: </span>
            </div>
            <div>
              <span>{pizza.description.calories} ккал</span>
              <span>{pizza.description.proteins} г</span>
              <span>{pizza.description.fats} г</span>
              <span>{pizza.description.carbs} г</span>
            </div>
          </div>
        </section>
        <div className={styles.bottom} style={{ width: '100%' }}>
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
          <div className={styles.actions}>
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
            <span className='pizza-block__price'>от {price} ₽</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPizza
