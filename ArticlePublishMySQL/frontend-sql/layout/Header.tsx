import React from 'react'
import s from './Layout.module.css'
import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import {
  setAddList,
  setAddRegister,
  setLogin,
  setMyArticles,
} from '@/reduxlogic/Slices/RoutingSlice'
import { getArtList } from '@/reduxlogic/Slices/ArticleSlice'
import { setAddArticle } from '@/reduxlogic/Slices/RoutingSlice'
import Image from 'next/image'
import { resetLogin } from '@/reduxlogic/Slices/LoginSlice'
import { resetRegistr } from '@/reduxlogic/Slices/RegistrSlice'
import { getMyArt } from '@/reduxlogic/Slices/MyArticles'

function refreshPage() {
  window.location.reload()
}
const Header = () => {
  const dispatch = useAppDispatch()
  const { authDone } = useAppSelector((state) => state.routing)
  const { responseLogin } = useAppSelector((state) => state.auth)
  return (
    <div className={s.buttonDiv}>
      <div>
        <Image
          src="/../public/SUPER_ARTICLES.png"
          height="100"
          width="100"
          alt="logo"
        />
      </div>

      <button
        className={s.buttClass}
        onClick={async () => {
          await dispatch(getArtList())
          dispatch(setAddList())
          dispatch(resetRegistr())
          responseLogin.token.length < 10 ? dispatch(resetLogin()) : ''
        }}
      >
        Статьи
      </button>

      {authDone ? (
        <button
          onClick={async () => {
            if (responseLogin.token.length > 10) {
              await dispatch(getMyArt(responseLogin.token))
              dispatch(setMyArticles())
            }
          }}
        >
          Мои статьи
        </button>
      ) : (
        ''
      )}

      {authDone ? (
        <>
          <button onClick={() => dispatch(setAddArticle())}>
            Добавить статью
          </button>
          <button onClick={() => refreshPage()}>Выйти</button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              dispatch(resetLogin())
              dispatch(setAddRegister())
            }}
          >
            Регистрация
          </button>
          <button
            onClick={() => {
              dispatch(setLogin())
              dispatch(resetRegistr())
            }}
          >
            Войти
          </button>
        </>
      )}
    </div>
  )
}

export default Header
