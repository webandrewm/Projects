import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import OneCardPersonel from '../components/OneCardPersonel'
import styles from '../styles/Home.module.css'

const PersonelArea = () => {
  const router = useRouter()
  const buyingData = useSelector((state: RootState) => state.orders.buyingData)
  return (
    <div className={styles.areaDiv}>
      {buyingData.length >= 1 ? (
        buyingData.map((item) => {
          return <OneCardPersonel key={item.id} {...item} />
        })
      ) : (
        <h1 className={styles.didntBuy}>
          You did not buy anything. Choose great products in our store.
        </h1>
      )}
      {buyingData.length >= 1 ? (
        <div className={styles.makePurchase}>
          <button
            onClick={() => router.push('/ThankYou')}
            className={styles.personArea}
          >
            <p>Make purchase</p>
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default PersonelArea
