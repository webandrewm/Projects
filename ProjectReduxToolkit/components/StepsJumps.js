import React from 'react'
import styles from '../styles/Home.module.css'
import { BsCircleFill } from 'react-icons/bs'
import { setState } from '../app/Slices.js/States'
import { useSelector } from 'react-redux'

const StepsJumps = ({ step, num, dispatch, index }) => {
  const currentStep = useSelector((state) => state.states.value)
  return (
    <div className={styles.fullCirc}>
      <div className={styles.blockCirc}>
        <BsCircleFill
          className={currentStep === index ? styles.BsCircles : styles.BsCircle}
        />
        <h1 className={styles.textIN}>{num}</h1>
        <p className={styles.textCirc}> {step} </p>
      </div>
    </div>
  )
}
export default StepsJumps
