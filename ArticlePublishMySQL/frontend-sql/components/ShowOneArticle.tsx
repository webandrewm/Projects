import { useAppSelector } from '@/reduxlogic/hooks'
import React, { ReactNode } from 'react'
import s from './OneArticle.module.css'


const ShowOneArticle = () => {
  const  {artID } = useAppSelector((state) => state.routing)
  const {allArticles} = useAppSelector((state)=> state.artdata)
  return (
    <div className={s.mainDiv}>
        {allArticles ? allArticles.map((item, index) => {
            if(artID === item.id) {
              return <div className={s.textDiv} key={index}>  
               <h1 style={{marginBottom: '0px'}}>{item.articleName}</h1>
                  <textarea readOnly className={s.textArea}>{item.articleText}</textarea>
                  <p style={{margin: '5px'}}>Автор: {item.author}</p>
                 </div>
            }
        }) : ''}
    </div>
  )
}

export default ShowOneArticle