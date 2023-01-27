import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { prodInter } from '../../app/apiInterface'
import { useDispatch } from 'react-redux'
import {
  addQuantity,
  changeColorHeart,
  decreaseCount,
} from '../../app/slices/buyingSlice'
import { pushDatatoArea } from '../../app/slices/buyingSlice'
import { getTotalQuantity } from '../../app/slices/buyingSlice'
import { AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
export const hitCheck: number = 300

const OneCard = (item: prodInter) => {
  const heardStyle = useSelector((state: RootState) => state.orders.heardStyle)
  const dispatch = useDispatch()
  return (
    <div className={styles.cardLink}>
      <div className={styles.card}>
        {item.rating.count > hitCheck ? (
          <Image
            className={styles.hitImage}
            width="60"
            height="60"
            alt="super hit pic"
            src="/sHit.png"
            priority
          />
        ) : (
          ''
        )}
        <Image
          className={styles.CardImage}
          src={`${item.image}`}
          alt={`${item.description}`}
          width="200"
          height="150"
        />
        <div className={styles.prodInfo}>
          <p className={styles.oneProdInfo}>Category: {item.category}</p>
          <p className={styles.oneProdInfo}>Product: {item.title}</p>
          <p className={styles.oneProdInfo}>
            {`${item.price.toFixed(2)}`} руб/шт.{' '}
          </p>
        </div>
        <div className={styles.buttonsLine}>
          <button
            onClick={() => {
              {
                dispatch(pushDatatoArea(item))
              }
              dispatch(getTotalQuantity())
            }}
            className={styles.buttonIn}
          >
            В корзину
          </button>
          <button
            className={styles.buttonPluse}
            onClick={() => {
              dispatch(addQuantity(item.id))
              dispatch(getTotalQuantity())
            }}
          >
            +
          </button>
          <p className={styles.prodCount}>{item.count}</p>
          <button
            className={styles.buttonMinus}
            onClick={() => {
              dispatch(decreaseCount(item.id))
              dispatch(getTotalQuantity())
            }}
          >
            -
          </button>
        </div>
      </div>
      <AiFillHeart
        onClick={() => dispatch(changeColorHeart(item.id))}
        className={item.ratingValue ? styles.redHeart : styles.heartStyle}
      />
    </div>
  )
}

export default OneCard
