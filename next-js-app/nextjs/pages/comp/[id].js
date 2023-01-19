import React from 'react'
import styles from '../../styles/Home.module.css'

export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments')
  const data = await res.json()
  const paths = data.map((data) => {
    return {
      params: { id: `${data.id}` },
    }
  })
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
  const data = await res.json()
  return {
    props: { data },
  }
}
const Details = ({ data }) => {
  console.log(data)
  return (
    <div className={styles.hell}>
      <div>
        <h1>ID: {data.id}</h1>
        <p>name: {data.name}</p>
        <p>email: {data.email}</p>
        <p>{data.body}</p>
      </div>
      <button className={styles.butt}>
        <a href="/comp/test">Go Back</a>
      </button>
    </div>
  )
}

export default Details
