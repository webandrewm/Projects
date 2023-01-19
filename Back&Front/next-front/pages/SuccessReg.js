import React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export const SuccessReg = () => {
  return (
    <div className={styles.signUpDiv}>
      <h1 className={styles.successLine}>Thank you</h1>
      <p className={styles.successLine}>You was registred on the website</p>
      <Link className={styles.successLineLink} href="/">
        <h1>Go to main page</h1>
      </Link>
    </div>
  )
}

export default SuccessReg
