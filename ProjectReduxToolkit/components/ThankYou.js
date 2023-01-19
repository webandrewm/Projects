import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
const ThankYou = () => {
  return (
    <div className={styles.styleInfos}>
      <div className={styles.plansLines}>
        <div className={styles.planAddon}>
          <Image
            className={styles.firstImages}
            width="50"
            height="100"
            src="/icon-thank-you.svg"
            alt="image"
          ></Image>
        </div>
        <div className={styles.planAddon}>
          <h1 className={styles.textThank}>Thank you!</h1>
          <p className={styles.textThank}>
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            support@loremgaming.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
