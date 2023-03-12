import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import { initialLogin } from '@/reduxlogic/Slices/LoginInterface'
import {
  authEmail,
  authPassword,
  getLogin,
} from '@/reduxlogic/Slices/LoginSlice'
import { setAuthDone, setToMain } from '@/reduxlogic/Slices/RoutingSlice'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import s from './Registration.module.css'
const Login = () => {
  const [cookie, setCookie, removeCookie] = useCookies()
  const dispatch = useAppDispatch()
  const { password, email, responseLogin }: initialLogin = useAppSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (responseLogin.token.length > 10) {
      dispatch(setAuthDone(true))
      dispatch(setToMain())
    } else {
      dispatch(setAuthDone(false))
    }
  }, [responseLogin.token])
  useEffect(() => {
    if (responseLogin.token) {
      return setCookie('auth', { token: responseLogin.token })
    }
  }, [responseLogin.token])

  return (
    <div className={s.mainDiv}>
      <h1 style={{ textAlign: 'center', color: 'rgb(91, 54, 166)' }}>Вход</h1>
      <input
        onChange={(e) => dispatch(authEmail(e.target.value))}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        placeholder="email"
      />
      <input
        onChange={(e) => dispatch(authPassword(e.target.value))}
        placeholder="пароль"
      />
      <button
        onClick={() => {
          if (email.length >= 1 && password.length >= 1) {
            dispatch(getLogin({ email: email, password: password }))
          }
        }}
        disabled={!(email.length >= 1 && password.length >= 1)}
      >
        Войти
      </button>
      {<p>{responseLogin.message ? responseLogin.message : ''}</p>}
    </div>
  )
}

export default Login
