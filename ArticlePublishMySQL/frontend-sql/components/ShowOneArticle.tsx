import { useAppSelector } from '@/reduxlogic/hooks'
import React, { ReactNode } from 'react'
import s from './OneArticle.module.css'
const ShowOneArticle = () => {
  const  {artID } = useAppSelector((state) => state.routing)
  const {allArticles} = useAppSelector((state)=> state.artdata)
  return (
    <div className={s.artDiv}>
        {allArticles ? allArticles.map((item, index) => {
            if(artID === item.id) {
              return <div className={s.oneArtModule} key={index}>  
                  <h1 style={{margin: '5px'}}>{item.articleName}</h1>
                  <p style={{margin: '5px'}}>{item.articleText}</p>
                  <p style={{margin: '5px'}}>Автор: {item.author}</p>
                 </div>
            }
        }) : ''}
    </div>
  )
}

export default ShowOneArticle