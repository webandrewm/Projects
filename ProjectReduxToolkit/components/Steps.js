import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import StepsJumps from './StepsJumps'
import Info from './Info'
import Plan from './Plan'
import AddOns from './AddOns'
import ThankYou from './ThankYou'
import { useDispatch, useSelector } from 'react-redux'
import Finishing from './Finishing'

const stepsCircles = ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY']
const stepsNum = ['1', '2', '3', '4']
const Steps = () => {
  const someState = useSelector((state) => state.states.value)
  const dispatch = useDispatch()
  return (
    <div className={styles.mainStyle}>
      {someState === 0 ? (
        <div className={styles.styleInfo}>
          <Info dispatch={dispatch} />
        </div>
      ) : (
        ''
      )}
      {someState == 1 ? <Plan dispatch={dispatch} /> : ''}
      {someState == 2 ? <AddOns dispatch={dispatch} /> : ''}
      {someState == 3 ? <Finishing dispatch={dispatch} /> : ''}
      {someState == 4 ? <ThankYou /> : ''}
      <div className={styles.firstImageForm}>
        <Image
          className={styles.firstImage}
          width="300"
          height="700"
          src="/bg-sidebar-desktop.svg"
          alt="image"
        ></Image>
        {stepsCircles.map((item, index) => {
          return (
            <StepsJumps
              dispatch={dispatch}
              step={item}
              key={index}
              num={stepsNum[index]}
              index={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Steps
