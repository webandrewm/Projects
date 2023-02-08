import React from 'react'
import Header from './header'
import styles from '../styles/Home.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
