import React, { useState } from 'react'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

const Test = ({ data }) => {
  const [nextContent, setNextContent] = useState(5)
  function goNext() {
    if (nextContent >= 5) {
      setNextContent((prev) => prev + 5)
    }
  }
  function showBack() {
    if (nextContent >= 5) {
      setNextContent((prev) => prev - 5)
    }
  }
  return (
    <div className={styles.hell}>
      <h1>CARDS :</h1>
      {data.map((dat, index) => {
        return (
          index < nextContent && (
            <Link href={`${dat.id}`} key={dat.id}>
              <div className={styles.card} key={dat.id}>
                <p>id: {dat.id}</p>
                <p>name: {dat.name}</p>
                <p>email: {dat.email}</p>
                <p>{dat.body}</p>
              </div>
            </Link>
          )
        )
      })}
      <br />
      <button onClick={goNext} className={styles.butt}>
        Show more
      </button>
      {nextContent > 5 && (
        <button onClick={showBack} className={styles.butt}>
          Show back
        </button>
      )}
    </div>
  )
}
export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments')
  const data = await res.json()
  return {
    props: { data },
  }
}

export default Test
