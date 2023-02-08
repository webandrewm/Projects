import axios from 'axios'
import React from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getServerAnswer, serverOk } from '../app/Slices/RegisterSlice'
import { setError, getEmail, getPass } from '../app/Slices/RegisterSlice'
import { useSelector } from 'react-redux'
const Register = () => {
  const { email, password } = useSelector((state) => state.register.userdata)
  const status = useSelector((state) => state.register.status)
  const router = useRouter()
  const dispatch = useDispatch()
  const toRegister = async () => {
    await axios
      .post('http://localhost:4444/registr', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res) {
          console.log(res)
          dispatch(getServerAnswer(res))
        }
        dispatch(serverOk(true))
        router.push('/Success')
      })
      .catch((err) => {
        console.log(err)
        if (err) {
          dispatch(serverOk(false))
          dispatch(setError(err.response?.data.message))
        }
      })
  }

  return (
    <>
      <h1 className={styles.loginHead}>Registration</h1>
      <div className={styles.loginDiv}>
        <div className={styles.auxDiv1}>
          <input
            onChange={(e) => {
              dispatch(getEmail(e.target.value))
            }}
            className={styles.loginEmail}
            placeholder="email"
          ></input>
          <input
            onChange={(e) => {
              dispatch(getPass(e.target.value))
            }}
            className={styles.loginPassword}
            placeholder="password"
          ></input>
        </div>
        <div className={styles.auxDiv2}>
          <button
            onClick={() => {
              toRegister()
            }}
            className={styles.buttonLogin}
          >
            Register
          </button>
          <button
            onClick={() => router.push('/')}
            className={styles.buttonLoginMain}
          >
            Main page
          </button>
        </div>
      </div>
    </>
  )
}

export default Register
