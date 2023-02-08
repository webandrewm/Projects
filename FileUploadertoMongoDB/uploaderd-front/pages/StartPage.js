import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const StartPage = () => {
  return (
    <div className={styles.StartPage}>
      <div className={styles.startDiv1}>
        <h1>Wellcome to File Uploader home page</h1>
        <p>
          This file uploader has great features. User access data to the storage
          is well encrypted.
        </p>
        <br />
        <p>
          This file uploader stores your data in a binary feed. The files are
          divided into pieces and stored in a separate storage. The MongoDB
          database is used as storage.
        </p>
      </div>
      <div className={styles.startDiv2}>
        <Link href="https://www.mongodb.com/">
          <Image
            alt="mongo"
            width="600"
            height="300"
            src="/../public/Mongo.png"
          ></Image>
        </Link>
      </div>
    </div>
  )
}

export default StartPage
