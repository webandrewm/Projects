import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import {
  getEmail,
  getName,
  getPass,
  serverOk,
  setError,
} from '../app/Slices/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Input, Grid, Button } from '@nextui-org/react'
import validator from 'validator'

export const Registration = () => {
  const router = useRouter()
  const { username, email, password } = useSelector(
    (state) => state.states.userdata
  )
  const error = useSelector((state) => state.states.errorCase)
  const status = useSelector((state) => state.states.status)
  const dispatch = useDispatch()

  const toBack = async () => {
    await axios
      .post('http://localhost:4444/registr', {
        email: email,
        password: password,
        username: username,
      })
      .then(() => {
        dispatch(serverOk(true))
      })
      .catch((err) => {
        dispatch(serverOk(false))
        dispatch(setError(err.response.data.message))
      })
  }
  useEffect(() => {
    if (status) {
      router.push('/SuccessReg')
      dispatch(serverOk(false))
    }
  }, [router, status])

  return (
    <>
      <div className={styles.signUpDiv}>
        <h1 className={'font-effect-3d'}>Sign up</h1>
        <div>
          <Grid.Container gap={4}>
            <Grid>
              <Input
                onChange={(e) => {
                  dispatch(getName(e.target.value))
                }}
                clearable
                type="test"
                label="Username"
                placeholder="Username"
              />
              {validator.isAlphanumeric(username) || username.length < 1 ? (
                ''
              ) : (
                <p>Incorrect username</p>
              )}
            </Grid>
            <Grid>
              <Input
                onChange={(e) => {
                  dispatch(getEmail(e.target.value))
                }}
                clearable
                type="test"
                label="Email"
                placeholder="Email"
              />
              {validator.isEmail(email) || email.length < 2 ? (
                ''
              ) : (
                <p>Email is wrong</p>
              )}
            </Grid>
            <Grid>
              <Input.Password
                onChange={(e) => {
                  dispatch(getPass(e.target.value))
                }}
                clearable
                color="warning"
                type="password"
                label="Password"
                placeholder="Password"
              />
              {password.length < 1 || password.length >= 5 ? (
                ''
              ) : (
                <p>Incorrect password</p>
              )}
            </Grid>
          </Grid.Container>
        </div>
        <p>{error}</p>
        <div className={styles.ButtonCenter}>
          <p>{error}</p>
          <Grid>
            <Button
              disabled={
                !(
                  validator.isEmail(email) &&
                  validator.isAlphanumeric(username) &&
                  (password.length < 1 || password.length >= 5)
                )
              }
              onClick={() => {
                toBack()
              }}
              shadow
              color="primary"
              auto
            >
              Register
            </Button>
          </Grid>
        </div>
      </div>
    </>
  )
}
export default Registration
