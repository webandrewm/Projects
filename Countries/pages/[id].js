import { BiArrowBack } from 'react-icons/bi'
import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'

export const getStaticPaths = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all')
  const data = await res.json()
  const paths = data.map((item) => {
    return {
      params: { id: `${item.cca3}` },
    }
  })
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`)
  const data = await res.json()
  return {
    props: { data },
  }
}
const Details = ({ data }) => {
  const [country] = data
  const [offName] = Object.values(country.name.nativeName)
  const [currenciesName] = Object.values(country.currencies)
  const [languageName] = Object.values(country.languages)
  return (
    <div>
      <Link href="/" className={styles.BLink}>
        <button className={styles.cardButton}>
          <BiArrowBack className={styles.Icons} />
          Go Back
        </button>
      </Link>
      <div className={styles.cardIn}>
        <div className={styles.imgInBlock}>
          <Image
            src={country.flags.png}
            alt={country.name.common}
            width="512"
            height="340"
            className={styles.singleImg}
          />
        </div>
        <div className={styles.cardInBlock}>
          <h1>{country.name.common}</h1>
          <p>Native Name: {offName.official}</p>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Sub Region: {country.subregion}</p>
          <p>Capital: {country.capital}</p>
          <p>Top Level Domain: {country.tld}</p>
          <p>Currencies: {currenciesName.name} </p>
          <p>Languages: {languageName}</p>
          <div className={styles.borders}>
            {country.borders ? 'Border Countries:' : ''}
            {country.borders
              ? country.borders.map((item) => {
                  return (
                    <>
                      <Link href={`http://localhost:3000/${item}`}>
                        <button className={styles.cardBorderButt}>
                          {item}
                        </button>
                      </Link>
                    </>
                  )
                })
              : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
