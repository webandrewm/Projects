import React from 'react'
import { useSelector } from 'react-redux'
import { nextStep, backStep } from '../app/Slices.js/States'
import styles from '../styles/Home.module.css'
import { setState } from '../app/Slices.js/States'
const Finishing = ({ dispatch }) => {
  const plan = useSelector((state) => state.global.planSelected.name)
  const totalPrice = useSelector((state) => state.global.planSelected.price)
  const time = useSelector((state) => state.global.planTime)
  const service = useSelector((state) => state.global.onlineServices)
  const prices = useSelector((state) => state.global.onlinePrices)
  const planAdv = useSelector((state) => state.global.planAdv)
  const planArc = useSelector((state) => state.global.planArc)
  const planPro = useSelector((state) => state.global.planPro)
  return (
    <div className={styles.styleInfo}>
      <div className={styles.styleHead}>
        <h1>Finishing up</h1>
        <p className={styles.totalPrice}>
          Double-check everything looks OK before confirm
        </p>
      </div>
      {plan ? (
        <div className={styles.planDiv}>
          <p className={styles.planFull}>
            {plan}
            {time === false && plan ? `(Mountly)` : plan ? `(For year)` : ''}
            {plan === 'Arcade' ? (
              <p className={styles.planFull}>{`${planArc.price} $`} </p>
            ) : plan === 'Advanced' ? (
              <p className={styles.planFull}>{`${planAdv.price} $`}</p>
            ) : plan === 'Pro' ? (
              <p className={styles.planFull}> {`${planPro.price} $`} </p>
            ) : (
              ''
            )}
          </p>
          <p className={styles.change} onClick={() => dispatch(setState(1))}>
            Change
          </p>
        </div>
      ) : (
        ''
      )}
      <div className={styles.finishing}>
        {service.online ? (
          <div className={styles.planDiv}>
            <div>{service.online === false ? '' : `Online service:`}</div>
            <div>{service.online === false ? '' : `+ ${prices.online} $`}</div>
          </div>
        ) : (
          ''
        )}
        {service.storage ? (
          <div className={styles.planDiv}>
            <div>{service.storage === false ? '' : `Large storage:`}</div>
            <div>
              {service.storage === false ? (
                ''
              ) : (
                <p> {`+ ${prices.storage} $`} </p>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
        {service.profile ? (
          <div className={styles.planDiv}>
            <div>
              {service.profile === false ? '' : `Customizable profile:`}
            </div>
            <div>
              {service.profile === false ? '' : `+ ${prices.profile} $`}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {totalPrice ? (
        <div className={styles.totalPrice}>
          Toral Price: {`${totalPrice} $`}
        </div>
      ) : (
        ''
      )}
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

export default Finishing
