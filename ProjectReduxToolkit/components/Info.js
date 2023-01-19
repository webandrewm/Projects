import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/Home.module.css'
import { nextStep } from '../app/Slices.js/States'
import {
  getName,
  getEmail,
  getPhone,
  phoneValidation,
  mailValidation,
} from '../app/Slices.js/FormInfo'
import parsePhoneNumber from 'libphonenumber-js'
import validator from 'validator'

const Info = ({ dispatch }) => {
  const searchName = useSelector((state) => state.global.name)
  const searchEmail = useSelector((state) => state.global.email)
  const searchPhone = useSelector((state) => state.global.phoneNumber)
  const next = useSelector((state) => state.global.buttonNext)
  return (
    <div>
      <div className={styles.styleHead}>
        <h1>Personel Info</h1>
        <p>Please provide your name, email address and phone number</p>
        <form>
          <div className={styles.onInput}>
            <lable className={styles.lable}>Name: </lable>
            <div>
              <input
                className={styles.input}
                value={searchName}
                placeholder="Name"
                onChange={(e) => {
                  dispatch(getName(e.target.value))
                }}
              />
            </div>
          </div>
          <br />
          <div className={styles.onInput}>
            <lable className={styles.lable}>Email: </lable>
            <div>
              <input
                className={styles.input}
                value={searchEmail}
                placeholder="Email"
                onChange={(e) => {
                  dispatch(mailValidation(validator.isEmail(e.target.value)))
                  dispatch(getEmail(e.target.value))
                }}
              />
              {!validator.isEmail(searchEmail) && searchEmail ? (
                <p className={styles.errorData}>Please enter correct email</p>
              ) : (
                ''
              )}
            </div>
          </div>
          <br />
          <div className={styles.onInput}>
            <label className={styles.lable}>Phone: </label>
            <div>
              <input
                className={styles.input}
                value={searchPhone}
                on
                onChange={(e) => {
                  dispatch(getPhone(e.target.value))
                  let phone = parsePhoneNumber(e.target.value, 'RU')
                  if (phone) {
                    dispatch(
                      phoneValidation(
                        validator.isMobilePhone(e.target.value, 'ru-RU')
                      )
                    )
                  }
                }}
                placeholder="example. 89003004353"
              />
              {!validator.isMobilePhone(searchPhone, 'ru-RU') && searchPhone ? (
                <p>Please enter correct phone number</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </form>
      </div>
      <div className={styles.backnext}>
        <button
          disabled={
            !(
              searchName &&
              validator.isEmail(searchEmail) &&
              validator.isMobilePhone(searchPhone, 'ru-RU')
            )
          }
          className={styles.allButton}
          onClick={() => {
            if (searchName && searchEmail && searchPhone) {
              dispatch(nextStep())
            }
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  )
}

export default Info
