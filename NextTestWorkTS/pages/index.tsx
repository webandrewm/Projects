import styles from '../styles/Home.module.css'
import { useGetFullApiQuery } from '../app/api'
import OneCard from '../components/OneCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeToRubles, getData, setCounts } from '../app/slices/buyingSlice'
import { RootState } from '../app/store'
import ImageComp from '../components/ImageComp'
import { prodInter } from '../app/apiInterface'

export default function Home() {
  const dispatch = useDispatch()
  const { data, isLoading } = useGetFullApiQuery('')
  useEffect(() => {
    dispatch(getData(data))
    dispatch(setCounts())
    dispatch(changeToRubles())
  }, [dispatch, data])
  const newData: prodInter[] = useSelector(
    (state: RootState) => state.orders.data
  )
  return (
    <div>
      {isLoading ? (
        <h1 className={styles.Loading}>Loading...</h1>
      ) : (
        <div className={styles.cards}>
          <ImageComp />
          {newData
            ? newData.map((item, index) => {
                return <OneCard key={index} {...item} />
              })
            : ''}
        </div>
      )}
    </div>
  )
}
