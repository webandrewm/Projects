import React from 'react'
import styles from '../styles/Home.module.css'
import { Switch } from '@nextui-org/react'
import { nextStep, backStep } from '../app/Slices.js/States'
import {
  selectPlan,
  setPlanTimeSwitch,
  setPlanTime,
} from '../app/Slices.js/FormInfo'
import { useSelector } from 'react-redux'

const Plan = ({ dispatch }) => {
  const planAdv = useSelector((state) => state.global.planAdv)
  const planArc = useSelector((state) => state.global.planArc)
  const planPro = useSelector((state) => state.global.planPro)
  const planSelected = useSelector((state) => state.global.planSelected)
  const planTime = useSelector((state) => state.global.planTime)
  return (
    <div className={styles.styleInfo}>
      <div className={styles.styleHead}>
        <h1>Select your plan</h1>
        <p>You have the option of monthly or yearly billing</p>
      </div>
      <div className={styles.plansLine}>
        <div
          onClick={() =>
            dispatch(selectPlan({ name: 'Arcade', price: planArc.price }))
          }
          className={
            planSelected.name === 'Arcade' ? styles.changed : styles.planS
          }
        >
          <h1 className={styles.planName}>{planArc.name}</h1>
          <p>
            {planArc.price}$/{planTime === false ? `mo` : `yr`}
          </p>
        </div>
        <div
          className={
            planSelected.name === 'Advanced' ? styles.changed : styles.planS
          }
          onClick={() =>
            dispatch(selectPlan({ name: 'Advanced', price: planAdv.price }))
          }
        >
          <h1 className={styles.planName}>{planAdv.name}</h1>
          <p>
            {planAdv.price}$/{planTime === false ? `mo` : `yr`}
          </p>
        </div>
        <div
          className={
            planSelected.name === 'Pro' ? styles.changed : styles.planS
          }
          onClick={() =>
            dispatch(selectPlan({ name: 'Pro', price: planPro.price }))
          }
        >
          <h1 className={styles.planName}>{planPro.name}</h1>
          <p>
            {planPro.price}$/{planTime === false ? `mo` : `yr`}
          </p>
        </div>
      </div>
      <div>
        <div className={styles.styleSwitch}>
          <p className={styles.switchDivText}>Monthly</p>
          <Switch
            className={styles.switchPersonal}
            initialChecked={planTime}
            onChange={(e) => {
              dispatch(setPlanTime(e.target.checked))
              dispatch(setPlanTimeSwitch(e.target.checked))
            }}
          />
          <p className={styles.switchDivText}> Yearly</p>
        </div>
      </div>
      <div className={styles.backnext}>
        <button
          className={styles.allButton}
          onClick={() => {
            dispatch(backStep())
          }}
        >
          Go Back
        </button>
        <button
          disabled={!planSelected.name}
          className={styles.allButton}
          onClick={() => {
            dispatch(nextStep())
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  )
}

export default Plan
