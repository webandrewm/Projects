import styles from '../../../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { RootState } from '../../../app/store'
import { useGetFullApiQuery } from '../../../app/api'
import { goingToMainPage } from '../../../app/slices/buyingSlice'

const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const totalQuantity = useSelector(
    (state: RootState) => state.orders.totalQuantity
  )
  const pageState = useSelector((state: RootState) => state.orders.pageState)

  const { isLoading } = useGetFullApiQuery('')
  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <div className={styles.Header}>
          {pageState ? (
            ''
          ) : (
            <button
              onClick={() => {
                router.push('/PersonelArea')
                dispatch(goingToMainPage())
              }}
              className={styles.personArea}
            >
              <p>
                Personel Area: {totalQuantity} <HiOutlineShoppingCart />
              </p>
            </button>
          )}
          {pageState ? (
            <button
              onClick={() => {
                router.push('/')
                dispatch(goingToMainPage())
              }}
              className={styles.personArea}
            >
              <p>To main page</p>
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  )
}

export default Header
