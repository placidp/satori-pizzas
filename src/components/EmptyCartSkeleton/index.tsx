import styles from './EmptyCartSkeleton.module.scss'

export const EmptyCartSkeleton = () => {
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
