import { useAppDispatch } from '@/reduxlogic/hooks'
import { setLogin, setToMain } from '@/reduxlogic/Slices/RoutingSlice'
import React from 'react'
import s from './RegistrationConfirm.module.css'
import { resetRegistr } from '@/reduxlogic/Slices/RegistrSlice'
const RegistrationConfirm = () => {
  const dispatch = useAppDispatch()
  return (
    <div className={s.mainDiv}>
      <h1>Поздравляем, вы зарегистрированы!</h1>
      <button
        onClick={() => {
          dispatch(resetRegistr())
          dispatch(setLogin())
        }}
      >
        Войти
      </button>
      <button
        onClick={() => {
          dispatch(resetRegistr())
          dispatch(setToMain())
        }}
      >
        На главную
      </button>
    </div>
  )
}

export default RegistrationConfirm
