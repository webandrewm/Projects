import React from 'react'
import { prodInter } from '../../app/apiInterface'
import Image from 'next/image'
import styles from '../../pages/components/OneCardPersonel.module.css'
import { addQuantity, getTotalQuantity } from '../../app/slices/buyingSlice'
import { decreaseCount } from '../../app/slices/buyingSlice'
import { useDispatch } from 'react-redux'
const OneCardPersonel = (item: prodInter) => {
  const discpatch = useDispatch()
  return (
    <>
      <div className={styles.desktopSX}>
        <Image
          alt="image in area"
          src={`${item.image}`}
          width="216"
          height="192"
          className={styles.image51}
        />
        <div className={styles.textbox33}>
          <span>Category: {item.category}</span>
        </div>
        <div className={styles.textbox01}>
          <span>{item.title}</span>
        </div>
        <div className={styles.textbox1}>
          <span>{item.description}</span>
        </div>

        <div className={styles.textbox2}>
          <span>Price for one: {item.price.toFixed(2)} rub</span>
        </div>
        <button
          onClick={() => {
            discpatch(addQuantity(item.id))
            discpatch(getTotalQuantity())
          }}
          className={styles.filledbutton1}
        >
          <span className={styles.text08}>+</span>
        </button>
        <div className={styles.textbox3}>
          <span className={styles.text09}>{item.count}</span>
        </div>
        <button
          onClick={() => {
            discpatch(decreaseCount(item.id))
            discpatch(getTotalQuantity())
          }}
          className={styles.filledbutton2}
        >
          <span className={styles.text10}>-</span>
        </button>
      </div>
    </>
  )
}

export default OneCardPersonel
