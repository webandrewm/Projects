import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../app/Slices/auth'
import { loginEmail, loginPass } from '../app/Slices/dataSlice'
import { Input, Grid } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import styles from '../styles/Home.module.css'
export const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const email = useSelector((state) => state.states.userLogin.email)
  const pass = useSelector((state) => state.states.userLogin.password)
  const error = useSelector((state) => state.auth.errorCase)
  const status = useSelector((state) => state.auth.dataStatus)
  useEffect(() => {
    if (status) {
      router.push('/')
    }
  }, [router, status])

  return (
    <div className={styles.signUpDiv}>
      <h1 className={'font-effect-3d'}>Log in</h1>
      <div className={styles.signCont}>
        <Grid.Container gap={4}>
          <Grid>
            <Input
              onChange={(e) => {
                dispatch(loginEmail(e.target.value))
              }}
              clearable
              type="test"
              label="Email"
              placeholder="Enter your email"
            />
          </Grid>
          <Grid>
            <Input.Password
              onChange={(e) => {
                dispatch(loginPass(e.target.value))
              }}
              clearable
              type="password"
              label="Password"
              placeholder="Enter your password with eye"
            />
          </Grid>
        </Grid.Container>
      </div>
      <p>{error}</p>
      <div className={styles.ButtonCenter}>
        <Grid>
          <Button
            onPress={() => {
              dispatch(
                fetchUser({
                  email: email,
                  password: pass,
                })
              )
            }}
            color="primary"
            auto
          >
            Log in
          </Button>
        </Grid>
      </div>
    </div>
  )
}

export default Login
