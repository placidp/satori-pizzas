import styles from './FullPizzaSkeleton.module.scss'

export const FullPizzaSkeleton = () => {
  return (
    <div className='fullPizzaContainer'>
      <div className={`${styles.pizzaBlock} pizza-block`}></div>
      <div className={styles.about}>
        <h2 className={`${styles.title} pizza-block__title`}></h2>
        <section className={styles.description}>
          <div className={styles.ingredients}>
            <h3></h3>
            <span></span>
            <span></span>
          </div>
          <h4></h4>
          <div className={styles.nutrients}>
            <div className={styles.nutrientsNames}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.nutrientsValues}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>
        <div className={styles.bottom}>
          <div className='pizza-block__selector'></div>
          <div className={styles.actions}>
            <div></div>
            <span className='pizza-block__price'></span>
          </div>
        </div>
      </div>
    </div>
  )
}
