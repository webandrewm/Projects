import React from 'react'
import styles from '../styles/Home.module.css'
import { Checkbox } from '@nextui-org/react'
import { nextStep } from '../app/Slices.js/States'
import { backStep } from '../app/Slices.js/States'
import { useSelector } from 'react-redux'
import { addAddons } from '../app/Slices.js/FormInfo'

const AddOns = ({ dispatch }) => {
  const online = useSelector((state) => state.global.onlineServices.online)
  const storage = useSelector((state) => state.global.onlineServices.storage)
  const profile = useSelector((state) => state.global.onlineServices.profile)
  return (
    <div className={styles.styleInfo}>
      <div className={styles.styleHead}>
        <h1>Pick add-ons</h1>
        <p>Add-ons help enchance your gaming experience.</p>
      </div>
      <div className={styles.plansLines}>
        <div className={styles.planAddons}>
          <Checkbox
            defaultSelected={online}
            onChange={(e) => {
              dispatch(addAddons({ name: 'online', value: e }))
            }}
            className={styles.checkbox}
          />
          <div className={styles.textService}>
            <p>Online Service</p>
            <p>Access to multiplayer games</p>
          </div>
          <div className={styles.priceText}>+ 5 $</div>
        </div>
        <div className={styles.planAddons}>
          <Checkbox
            onChange={(e) => {
              dispatch(addAddons({ name: 'storage', value: e }))
            }}
            defaultSelected={storage}
            className={styles.checkbox}
          />
          <div className={styles.textService}>
            <p>Large storage</p>
            <p>Extra 1TB cloud save</p>
          </div>
          <div className={styles.priceText}>+ 10 $</div>
        </div>
        <div className={styles.planAddons}>
          <Checkbox
            onChange={(e) => {
              dispatch(addAddons({ name: 'profile', value: e }))
            }}
            defaultSelected={profile}
            className={styles.checkbox}
          />
          <div className={styles.textService}>
            <p>Customizable profile</p>
            <p>Custom theme on your profile</p>
          </div>
          <div className={styles.priceText}>+ 15 $</div>
        </div>
      </div>
      <div className={styles.switchDiv}></div>
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

export default AddOns
