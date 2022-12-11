import styles from './FullPizzaSkeleton.module.scss'

export const FullPizzaSkeleton = () => {
  return (
    <div className='fullPizzaContainer'>
      <div
        className='pizza-block'
        style={{ backgroundColor: '#eee', borderRadius: '50%', width: '350px', height: '350px' }}
      ></div>
      <div className={styles.about}>
        <h2
          className='pizza-block__title'
          style={{
            width: '150px',
            height: '32px',
            backgroundColor: '#eee',
            borderRadius: '12px',
          }}
        ></h2>
        <section className={styles.description}>
          <div className={styles.ingredients}>
            <h3
              style={{
                width: '150px',
                height: '28px',
                backgroundColor: '#eee',
                borderRadius: '12px',
                marginBottom: '16px',
              }}
            ></h3>
            <span
              style={{
                display: 'block',
                marginBottom: '10px',
                width: '580px',
                height: '18px',
                backgroundColor: '#eee',
                borderRadius: '12px',
              }}
            ></span>
            <span
              style={{
                display: 'block',
                marginBottom: '10px',
                width: '120px',
                height: '18px',
                backgroundColor: '#eee',
                borderRadius: '12px',
              }}
            ></span>
          </div>
          <h4
            style={{
              width: '230px',
              height: '28px',
              backgroundColor: '#eee',
              borderRadius: '12px',
              marginBottom: '16px',
            }}
          ></h4>
          <div className={styles.nutrients}>
            <div>
              <span
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '140px',
                  height: '18px',
                  backgroundColor: '#eee',
                  borderRadius: '12px',
                }}
              ></span>
              <span
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '60px',
                  height: '18px',
                  backgroundColor: '#eee',
                  borderRadius: '12px',
                }}
              ></span>
              <span
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '60px',
                  height: '18px',
                  backgroundColor: '#eee',
                  borderRadius: '12px',
                }}
              ></span>
              <span
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '80px',
                  height: '18px',
                  backgroundColor: '#eee',
                  borderRadius: '12px',
                }}
              ></span>
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '75px',
                  height: '18px',
                  backgroundColor: '#eee',
                  borderRadius: '12px',
                }}
              ></span>
              <span
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '40px',
                  height: '18px',
                  backgroundColor: '#eee',
                  borderRadius: '12px',
                }}
              ></span>
              <span
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '40px',
                  height: '18px',
                  backgroundColor: '#eee',
                  borderRadius: '12px',
                }}
              ></span>
              <span
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '40px',
                  height: '18px',
                  backgroundColor: '#eee',
                  borderRadius: '12px',
                }}
              ></span>
            </div>
          </div>
        </section>
        <div className={styles.bottom} style={{ width: '100%', height: '150px' }}>
          <div
            className='pizza-block__selector'
            style={{ width: '100%', alignItems: 'center', textAlign: 'center', padding: '8px' }}
          ></div>
          <div className={styles.actions}>
            <div
              style={{
                width: '200px',
                height: '42px',
                backgroundColor: '#eee',
                borderRadius: '12px',
              }}
            ></div>
            <span
              style={{
                width: '100px',
                height: '30px',
                backgroundColor: '#eee',
                borderRadius: '12px',
              }}
              className='pizza-block__price'
            ></span>
          </div>
        </div>
      </div>
    </div>
  )
}
