import axios from 'axios'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza = () => {
  const [pizza, setPizza] = useState()
  const params = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://628b53177886bbbb37b5a7c5.mockapi.io/items/' + params.id
        )
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return 'Загрузка...'
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  )
}

export default FullPizza
