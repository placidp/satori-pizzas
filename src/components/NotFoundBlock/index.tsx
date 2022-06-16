import React from 'react'

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>☹️</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>К сожалению данная страница отсутствует в нашем магазине</p>
    </div>
  )
}

export default NotFoundBlock
