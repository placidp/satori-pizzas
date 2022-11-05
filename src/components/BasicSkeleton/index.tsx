import styles from './BasicSkeleton.module.scss'

export const BasicSkeleton = () => {
  return (
    <div className={styles.cartEmpty}>
      <h2>
        <span></span>
      </h2>
      <p></p>
      <p></p>
      <div />
      <a></a>
    </div>
  )
}
