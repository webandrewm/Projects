import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setLogOff } from '../app/Slices/auth'
import { serverOk } from '../app/Slices/dataSlice'
import { Button, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { messageReset } from '../app/Slices/change'
import { HiOutlineShoppingCart } from 'react-icons/hi'
const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const status = useSelector((state) => state.auth.dataStatus)
  const userData = useSelector((state) => state.auth.userData)
  const totalQuantity = useSelector((state) => state.product.totalQuantity)

  return (
    <div className={styles.Header}>
      <div className={`${styles.headerText} font-effect-3d`}>
        <h1
          onClick={() => {
            router.push('/')
            dispatch(messageReset())
          }}
        >
          MegaStore
        </h1>
      </div>
      <div className={styles.signButtons}>
        {!status ? (
          <div>
            <Grid.Container gap={0}>
              <Link href="/Registration">
                <Grid css={{ margin: '10px' }}>
                  <Button auto>Sign up</Button>
                </Grid>
              </Link>
              <Link href="/Login">
                <Grid css={{ margin: '10px' }}>
                  <Button auto>Log in</Button>
                </Grid>
              </Link>
            </Grid.Container>
          </div>
        ) : (
          <>
            <h1 className={'font-effect-3d'}>Hello, {userData.username}!</h1>
            <Grid.Container gap={0}>
              <Grid css={{ margin: '10px' }}>
                <Link href="/">
                  <Button
                    onPress={() => {
                      dispatch(setLogOff())
                      dispatch(serverOk(false))
                      router.push('/')
                    }}
                    auto
                  >
                    Log off
                  </Button>
                </Link>
              </Grid>

              <Grid css={{ margin: '10px' }}>
                <Button
                  onPress={(e) => {
                    router.push('/Profile')
                  }}
                  auto
                >
                  Personal area
                  {totalQuantity > 0 ? (
                    <h1 className={styles.buyingCount}>
                      {totalQuantity}
                      <HiOutlineShoppingCart />
                    </h1>
                  ) : (
                    ''
                  )}
                </Button>
              </Grid>
            </Grid.Container>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
