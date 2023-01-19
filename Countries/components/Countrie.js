import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Countrie = ({ countrie }) => {
  return (
    <Link href={`${countrie.cca3}`} className={styles.cardLink}>
      <div className={styles.card}>
        <Image
          className={styles.CardImage}
          src={countrie.flags.png}
          alt={countrie.name.common}
          width="300"
          height="170"
        />
        <h1 className={styles.countrie}>{countrie.name.common}</h1>
        <p>Population: {countrie.population}</p>
        <p>Region: {countrie.region}</p>
        <p>Capital: {countrie.capital}</p>
      </div>
    </Link>
  )
}

export default Countrie
