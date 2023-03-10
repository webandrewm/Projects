import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import {
  getConfirmPass,
  getEmail,
  getPassword,
  getRegistration,
  resetErrors,
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
      <h2 style={{ textAlign: 'center', color: 'rgb(91, 54, 166)' }}>
        Регистрация аккаунта
      </h2>
      <input
        onChange={(e) => {
          dispatch(resetErrors())
          dispatch(getEmail(e.target.value))
        }}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        placeholder="email"
      />

      <input
        onChange={(e) => {
          dispatch(resetErrors())
          dispatch(getPassword(e.target.value))
        }}
        placeholder="пароль"
      />
      <input
        onChange={(e) => {
          dispatch(resetErrors())
          dispatch(getConfirmPass(e.target.value))
        }}
        placeholder="подтвердите пароль"
      />
      <button
        onClick={() => {
          dispatch(
            getRegistration({
              email: email,
              password: password,
              confirmPass: confirmPass,
            })
          )

          if (response?.message === 'Вы зарегистрированы') {
            dispatch(successRegister())
          }
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
      {password === confirmPass || password.length < 1 ? (
        ''
      ) : (
        <p>Пароли не совпадают</p>
      )}
      {isEmail(email) || email.length < 1 ? '' : <p>Не правильная почта</p>}
      {password.length <= 4 &&
      password.length >= 1 &&
      confirmPass.length <= 4 &&
      confirmPass.length >= 1 ? (
        <p>Длинна пароля должна быть больше 4 символов</p>
      ) : (
        ''
      )}
    </div>
  )
}

export default Registration
