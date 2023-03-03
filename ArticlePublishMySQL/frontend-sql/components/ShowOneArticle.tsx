import { useAppSelector } from '@/reduxlogic/hooks'
import React from 'react'
import s from './OneArticle.module.css'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'

const ShowOneArticle = () => {
  const { artID } = useAppSelector((state) => state.routing)
  const { allArticles } = useAppSelector((state) => state.artdata)
  
  return (
    <div className={s.mainDiv}>
      {allArticles
      ? allArticles.map((item, index) => {
            if (artID === item.id) {
              return (
                <div className={s.textDiv} key={index}>
                  <h1 style={{ marginBottom: '0px' }}>{item.articleName}</h1>
                  {item.articleText ? <>{parse(item.articleText)}</> : ''}
                  <p style={{ margin: '5px' }}>Автор: {item.author}</p>
                </div>
              )
            }
          })
        : ''}
    </div>
  )
}

export default ShowOneArticle
