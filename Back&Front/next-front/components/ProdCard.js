import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
const ProdCard = ({ prod = prod }) => {
  const { image, price, title, id } = prod
  return (
    <Link className={styles.cardLink} href={`${id}`}>
      <div className={styles.card}>
        <Image
          className={styles.CardImage}
          src={image}
          alt={prod.title}
          width="220"
          height="180"
        />
        <p>{title}</p>
        <p>{price}$</p>
      </div>
    </Link>
  )
}

export default ProdCard
