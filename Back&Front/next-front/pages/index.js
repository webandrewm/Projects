import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { getData } from '../app/Slices/productSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ProdCard from '../components/ProdCard'
export default function Home() {
  const data = useSelector((state) => state.product.data)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getData())
  }, [])

  return (
    <div className={styles.cards}>
      {data
        ? data.map((item) => {
            return <ProdCard prod={item} key={item.id} />
          })
        : ''}
    </div>
  )
}
