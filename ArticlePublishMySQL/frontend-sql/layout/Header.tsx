import React from 'react'
import s from './Layout.module.css'
import { useAppDispatch } from '@/reduxlogic/hooks'
import { setAddList } from '@/reduxlogic/Slices/RoutingSlice'
import { getArtList } from '@/reduxlogic/Slices/ArticleSlice'
import { setAddArticle } from '@/reduxlogic/Slices/RoutingSlice'
import Image from 'next/image'

const Header = () => {
  const dispatch = useAppDispatch()

  return (
   
      <div className={s.buttonDiv}>
        <div>
          <Image
          src='/../public/SUPER_ARTICLES.png'
          height='100'
          width='100'
          alt='logo'
          />
        </div>
        <button
      onClick={() => {
        dispatch(setAddList())
        dispatch(getArtList())
      }}
    >
      Статьи
    </button>
    <button onClick={() => dispatch(setAddArticle())}>
      Добавить статью
    </button>
  </div>

  )
}

export default Header
