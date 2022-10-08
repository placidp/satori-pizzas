import { FC } from 'react'

import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <span>☹️</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>К сожалению данная страница отсутствует в нашем магазине</p>
    </div>
  )
}
