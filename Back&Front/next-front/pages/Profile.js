import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/Home.module.css'
import { Input, Grid, Button } from '@nextui-org/react'
import { useState } from 'react'
import { setCurrPass, setOldPass } from '../app/Slices/change'
import { changePassword } from '../app/Slices/change'
import { useRouter } from 'next/router'
import ShopingList from '../components/ShopingList'
import { clearBin, setDesiredDate, setPhone } from '../app/Slices/productSlice'
import 'react-phone-number-input/style.css'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { sendOrders } from '../app/Slices/ordersSlice'

export const Profile = () => {
  const currPass = useSelector((state) => state.change.currentPass)
  const router = useRouter()
  const dispatch = useDispatch()
  const [checkOut, setCheckout] = useState(false)
  const [changePass, setChangePass] = useState(false)
  const { username, email, createdAt } = useSelector((state) => {
    return state.auth.userData
  })
  const passMessage = useSelector((state) => state.change.oldPassMessage)
  const oldPass = useSelector((state) => state.change.oldPass)
  const id = useSelector((state) => state.auth.userData._id)
  const status = useSelector((state) => state.auth.dataStatus)
  const list = useSelector((state) => state.product.selectedData)
  const quantity = useSelector((state) => state.product.totalQuantity)
  const totalPrice = useSelector((state) => state.product.totalPrice)
  const phoneNumber = useSelector((state) => state.product.phoneNumber)
  const desiredDate = useSelector((state) => state.product.desiredDate)
  useEffect(() => {
    return async () => {
      if (!status) {
        router.push('/')
      }
    }
  }, [status])
  return (
    <div className={styles.mainPage}>
      <div className={styles.profileOptions}>
        {username ? (
          <div className={styles.profInfo}>
            <h1>Profile information</h1>
            <p>Username: {username} </p>
            <p>Email: {email} </p>
            <p>
              Registration date:{' '}
              {new Date(createdAt).toLocaleDateString('ru-RU')}
            </p>
            <div className={styles.cButton}>
              <Grid>
                <Button
                  onPress={() => {
                    if (!changePass) {
                      setChangePass(true)
                    } else {
                      setChangePass(false)
                    }
                  }}
                  auto
                >
                  Change password
                </Button>
              </Grid>
            </div>
          </div>
        ) : (
          ''
        )}
        {!changePass ? (
          ''
        ) : (
          <div className={styles.changePass}>
            <div>
              <Grid.Container gap={0}>
                <Grid>
                  <Input.Password
                    className={styles.changeElem}
                    onChange={(e) => {
                      dispatch(setOldPass(e.target.value))
                    }}
                    clearable
                    type="password"
                    label="Old password"
                  />
                </Grid>

                <Grid>
                  <Input.Password
                    className={styles.changeElem}
                    onChange={(e) => {
                      dispatch(setCurrPass(e.target.value))
                    }}
                    clearable
                    type="password"
                    label="New password"
                  />
                </Grid>
              </Grid.Container>
            </div>
            {passMessage ? <p className={styles.errMess}>{passMessage}</p> : ''}
            <Grid>
              <Button
                className={styles.changeElemB}
                auto
                onPress={() => {
                  dispatch(
                    changePassword({
                      id: id,
                      password: currPass,
                      oldPass: oldPass,
                    })
                  )
                }}
              >
                Change
              </Button>
            </Grid>
          </div>
        )}
      </div>
      <div className={styles.shoppingList}>
        <h1>Shopping list</h1>

        <div>
          {list.map((item, index) => {
            return <ShopingList data={item} key={index} />
          })}
          {quantity > 0 ? (
            ''
          ) : (
            <p>
              You have not selected any product. Please go to the main page and
              select something
            </p>
          )}
        </div>

        {totalPrice && quantity > 0 ? <h1>Total price {totalPrice} $</h1> : ''}

        {quantity > 0 ? (
          <div className={styles.buttonMake}>
            <Grid>
              <Button
                onPress={() => {
                  if (!checkOut) {
                    setCheckout(true)
                  } else {
                    setCheckout(false)
                    dispatch(setDesiredDate(''))
                    dispatch(setPhone(''))
                  }
                }}
                auto
              >
                Checkout
              </Button>
            </Grid>
          </div>
        ) : (
          ''
        )}
        {!checkOut ? (
          ''
        ) : (
          <>
            <div className={styles.contacts}>
              <Grid>
                <Input
                  css={{ marginTop: '10px', marginLeft: '15px' }}
                  onChange={(e) => dispatch(setDesiredDate(e.target.value))}
                  width="210px"
                  label="Desired date of delivery to store"
                  type="date"
                />
              </Grid>
              <Grid>
                <Input
                  css={{ marginTop: '10px' }}
                  onChange={(e) => {
                    dispatch(setPhone(e.target.value))
                  }}
                  className={styles.changeElemC}
                  clearable
                  placeholder="Phone Number (+7..)"
                  label="Phone Number +7"
                />
              </Grid>
            </div>
            <div className={styles.buttonMake}>
              <Grid css={{ marginTop: '10px' }}>
                <Button
                  onPress={() => {
                    dispatch(
                      sendOrders({
                        list,
                        desiredDate,
                        phoneNumber,
                        username,
                        email,
                      })
                    )
                    router.push('/OrderAccepted')
                    dispatch(clearBin())
                  }}
                  disabled={
                    isPossiblePhoneNumber(phoneNumber) && desiredDate.length > 0
                      ? false
                      : true
                  }
                  auto
                >
                  Make purchase
                </Button>
              </Grid>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
