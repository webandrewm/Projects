import React, { useEffect } from 'react'
import styles from './Success.module.css'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Success = () => {
  const regStatus = useSelector((state) => state.register.status)
  const router = useRouter()
  useEffect(() => {
    if (regStatus === false) {
      router.push('/')
    }
  }, [regStatus])
  return (
    <>
      {regStatus ? (
        <div>
          <h1 className={styles.successH1}>You was successfully registred</h1>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default Success
