import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { authEmail, authPass, loginUser } from '../app/Slices/userLogin'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useCookies } from 'react-cookie'

const Login = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['authData'])
  const { email, password } = useSelector((state) => state.auth.userLogin)
  const dataStatus = useSelector((state) => state.auth.dataStatus)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (email) {
      setCookie('auth', { email: email, password: password })
    }
  }, [email, password])

  useEffect(() => {
    if (cookie.auth?.email && cookie.auth?.password) {
      dispatch(
        loginUser({
          email: cookie.auth?.email,
          password: cookie.auth?.password,
        })
      )
    }
  }, [cookie])

  useEffect(() => {
    dataStatus ? router.push('/') : ''
  }, [dataStatus])

  return (
    <>
      <h1 className={styles.loginHead}>Log in</h1>
      <div className={styles.loginDiv}>
        <div className={styles.auxDiv1}>
          <input
            style={{ borderRadius: '3px' }}
            onChange={(e) => dispatch(authEmail(e.target.value))}
            placeholder="email"
          ></input>
          <input
            style={{ borderRadius: '3px' }}
            onChange={(e) => dispatch(authPass(e.target.value))}
            placeholder="password"
          ></input>
        </div>
        <div className={styles.auxDiv2}>
          <button
            onClick={() => {
              dispatch(loginUser({ email: email, password: password }))
            }}
            className={styles.buttonLogin}
          >
            Login
          </button>
          <button
            onClick={() => router.push('/')}
            className={styles.buttonLoginMain}
          >
            Main page
          </button>
        </div>
        <div className={styles.auxDiv3}>
          <p>
            Have no register? <Link href="/Register">Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
