import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import {
  getConfirmPass,
  getEmail,
  getPassword,
  getRegistration,
} from '@/reduxlogic/Slices/RegistrSlice'
import React, { useEffect } from 'react'
import s from './Registration.module.css'
import isEmail from 'validator/lib/isEmail'
import { useRouter } from 'next/router'
import { successRegister } from '@/reduxlogic/Slices/RoutingSlice'

const Registration = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { password, confirmPass, email, response } = useAppSelector(
    (state) => state.reg
  )
  useEffect(() => {
    response?.token ? '' : ''
  }, [response?.token])
  return (
    <div className={s.mainDiv}>
      <h1 style={{ textAlign: 'center' }}>Регистрация аккаунта</h1>
      <input
        onChange={(e) => dispatch(getEmail(e.target.value))}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        placeholder="email"
      />
      {isEmail(email) || email.length < 1 ? '' : <p>Не правильная почта</p>}
      <input
        onChange={(e) => dispatch(getPassword(e.target.value))}
        placeholder="пароль"
      />
      <input
        onChange={(e) => dispatch(getConfirmPass(e.target.value))}
        placeholder="подтвердите пароль"
      />
      {password === confirmPass || password.length < 1 ? (
        ''
      ) : (
        <p>Пароли не совпадают</p>
      )}
      {password.length <= 4 &&
      password.length >= 1 &&
      confirmPass.length <= 4 &&
      confirmPass.length >= 1 ? (
        <p>Длинна пароля должна быть больше 4 символов</p>
      ) : (
        ''
      )}
      <button
        onClick={() => {
          dispatch(
            getRegistration({
              email: email,
              password: password,
              confirmPass: confirmPass,
            })
          )
          dispatch(successRegister())
        }}
        disabled={
          !(
            password.length >= 5 &&
            confirmPass.length >= 5 &&
            confirmPass === password &&
            isEmail(email)
          )
        }
      >
        Зарегистрироваться
      </button>
      {response ? <p>{response.message}</p> : ''}
    </div>
  )
}

export default Registration
