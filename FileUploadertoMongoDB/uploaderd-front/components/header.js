import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logOff } from '../app/Slices/userLogin'
import { loggedOff } from '../app/Slices/GetSlice'
import { useCookies } from 'react-cookie'

const Header = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['authData'])

  const dataStatus = useSelector((state) => state.auth.dataStatus)
  const router = useRouter()
  const dispatch = useDispatch()
  function refreshPage() {
    window.location.reload(false)
  }
  return (
    <div className={styles.header}>
      <div onClick={() => router.push('/')} className={styles.headerDiv}>
        File uploader
      </div>
      {dataStatus ? (
        <>
          <button
            onClick={() => {
              dispatch(logOff())
              dispatch(loggedOff(''))
              refreshPage()
              router.push('/')
              removeCookie('auth')
            }}
            className={styles.but1}
          >
            Log off
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            router.push('/Login')
          }}
          className={styles.but1}
        >
          Log in
        </button>
      )}
      {dataStatus ? (
        ''
      ) : (
        <button
          onClick={() => router.push('/Register')}
          className={styles.but2}
        >
          Register
        </button>
      )}
    </div>
  )
}

export default Header
