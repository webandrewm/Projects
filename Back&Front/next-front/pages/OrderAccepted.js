import React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
const orderAccepted = () => {
  return (
    <div className={styles.signUpDiv}>
      <h1 className={styles.successLine}>Thank you!</h1>
      <p className={styles.successLine}>
        Your order has been accepted. You will be notified by email when your
        order can be picked up from our store.
      </p>
      <Link className={styles.successLineLink} href="/">
        Continue Shopping
      </Link>
    </div>
  )
}

export default orderAccepted
