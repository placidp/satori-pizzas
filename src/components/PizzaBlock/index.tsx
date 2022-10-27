import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItemByIdTypeSize } from '../../redux/cart/selectors'

import { addItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'
import { PizzaSizes } from '../../redux/pizza/types'

const pizzaTypes = ['тонкое', 'традиционное']

type PizzaBlockProps = {
  id: string
  name: string
  prices: {
    small: number
    medium: number
    large: number
  }
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

export const PizzaBlock: FC<PizzaBlockProps> = ({ id, name, prices, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const dispatch = useDispatch()
  const cartItem = useSelector(
    selectCartItemByIdTypeSize(id, pizzaTypes[activeType], sizes[activeSize])
  )

  const addedCount = cartItem ? cartItem.count : 0

  // pizza types change price
  let price: number = prices.small

  if (prices.medium && sizes[activeSize] === PizzaSizes.MEDIUM) {
    price = prices.medium
  } else if (prices.large && sizes[activeSize] === PizzaSizes.LARGE) {
    price = prices.large
  } else if (prices.small) {
    price = prices.small
  }

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      type: pizzaTypes[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item))
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link key={id} to={`/pizza/${id}`}>
          <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
          <h4 className='pizza-block__title'>{name}</h4>
        </Link>
        <div className='pizza-block__selector'>
          <ul>
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
          <ul>
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
        <div className='pizza-block__bottom'>
          {/* <div className='pizza-block__price'>от {prices.small || prices.medium} ₽</div> */}
          <div className='pizza-block__price'>от {price} ₽</div>
          <button onClick={onClickAdd} className='button button--outline button--add'>
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
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}
