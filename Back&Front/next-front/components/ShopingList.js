import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Grid } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import {
  decreaseCount,
  deleteItem,
  getTotalPrice,
  getTotalQuantity,
} from '../app/Slices/productSlice'
import { increasCount } from '../app/Slices/productSlice'
const ShopingList = ({ data }) => {
  const dispatch = useDispatch()
  const { id } = data
  return (
    <div className={styles.oneCard}>
      <div className={styles.buyingCard}>
        <Image
          className={styles.CardImage}
          src={data.image}
          alt={data.category}
          width="150"
          height="150"
        />
        <div>
          <p className={styles.h1buying}>{data.title}</p>
          <p className={styles.h1buying}> {data.price} $</p>
        </div>
        {data.title ? (
          <div className={styles.buttonsItem}>
            <div className={styles.incdec}>
              <Grid.Container css={{ marginRight: '10px' }}>
                <Grid>
                  <Button
                    css={{ height: '25px' }}
                    onPress={() => {
                      dispatch(decreaseCount(data))
                      dispatch(getTotalQuantity())
                      dispatch(getTotalPrice())
                    }}
                    auto
                  >
                    -
                  </Button>
                </Grid>
                <p className={styles.h1buying}>Count: {data.counts} </p>
                <Grid>
                  <Button
                    css={{ height: '25px' }}
                    onPress={() => {
                      dispatch(increasCount(data))
                      dispatch(getTotalQuantity())
                      dispatch(getTotalPrice())
                    }}
                    auto
                  >
                    +
                  </Button>
                </Grid>
              </Grid.Container>
              <Grid>
                <Button
                  css={{ height: '25px' }}
                  onPress={() => {
                    dispatch(deleteItem(id))
                    dispatch(getTotalQuantity())
                  }}
                  auto
                >
                  Delete
                </Button>
              </Grid>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default ShopingList
