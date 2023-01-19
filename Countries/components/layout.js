import React from 'react'
import Header from './header'
import styles from '../styles/Home.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      {children}
    </div>
  )
}

export default Layout
