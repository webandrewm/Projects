import axios from 'axios'
import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Grid, Button } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTotalPrice,
  getTotalQuantity,
  selectData,
} from '../app/Slices/productSlice'
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {
  const data = await axios.get('http://localhost:4444/prod')
  const paths = data.data.map((item) => {
    return {
      params: { id: `${item.id}` },
    }
  })
  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps = async (context) => {
  const id = await context.params.id
  const { data } = await axios.post(`http://localhost:4444/prod/id`, { id })
  return {
    props: { data },
  }
}
const Details = ({ data }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const status = useSelector((state) => state.auth.dataStatus)
  if (data) {
    const { title } = data
    return (
      <div className={styles.mainPic}>
        {title ? <h1>{title}</h1> : ''}
        <Image
          className={styles.CardImage}
          src={data.image}
          alt={data.category}
          width="500"
          height="400"
        />
        <h1>Price: {data.price}$</h1>
        <div className={styles.Descrp}>
          <p>Description: {data.description}</p>
          <Grid>
            <Button
              onPress={() => {
                dispatch(selectData(data))
                dispatch(getTotalQuantity())
                dispatch(getTotalPrice())
                if (!status) {
                  router.push('/Login')
                }
              }}
              className={styles.cButton}
            >
              Buy
            </Button>
          </Grid>
        </div>
      </div>
    )
  }
}
export default Details
