import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import {
  sendArticle,
  setArtName,
  setArtText,
  setAuthor,
} from '@/reduxlogic/Slices/ArticleSlice'
import { setToMain } from '@/reduxlogic/Slices/RoutingSlice'
import { RootState } from '@/reduxlogic/store'
import React from 'react'
import s from './AddArticle.module.css'

const AddArticle = () => {
  const dispatch = useAppDispatch()
  const { author, articleName, articleText } = useAppSelector(
    (state: RootState) => state.artdata
  )

  return (
    <div className={s.mainDiv}>
      <div className={s.textDiv}>
        <input
          onChange={(e) => dispatch(setAuthor(e.target.value))}
          className={s.artInput}
          placeholder="Автор"
        ></input>

        <input
          onChange={(e) => dispatch(setArtName(e.target.value))}
          className={s.artInput}
          placeholder="Название статьи"
        ></input>
        <textarea
          onChange={(e) => dispatch(setArtText(e.target.value))}
          className={s.textArea}
          cols={66}
          id="story"
          name="story"
          placeholder="Текст статьи"
        ></textarea>
        <button
          onClick={(): void => {
            dispatch(
              sendArticle({
                author: author,
                articleName: articleName,
                articleText: articleText,
              })
            )
            dispatch(setToMain())
          }}
          className={s.addArtButt}
        >
          Добавить статью
        </button>
      </div>
    </div>
  )
}

export default AddArticle
