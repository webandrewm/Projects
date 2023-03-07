import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import {
  sendArticle,
  setArtName,
  setArtText,
  setAuthor,
} from '@/reduxlogic/Slices/ArticleSlice'
import { setToMain } from '@/reduxlogic/Slices/RoutingSlice'
import { RootState } from '@/reduxlogic/store'
import s from './AddArticle.module.css'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import React from 'react'
export const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading</p>,
})
const formats = [
  'header',
  'align',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}
const AddArticle = () => {
  const dispatch = useAppDispatch()
  const { author, articleName, articleText } = useAppSelector(
    (state: RootState) => state.artdata
  )
  const { responseLogin } = useAppSelector((state) => state.auth)
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
        <QuillNoSSRWrapper
          style={{ height: '100%', margin: '10px' }}
          onChange={(e) => {
            console.log(e)
            dispatch(setArtText(e))
          }}
          modules={modules}
          formats={formats}
          theme="snow"
        />

        <button
          onClick={(): void => {
            dispatch(
              sendArticle({
                author: author,
                articleName: articleName,
                articleText: articleText,
                token: responseLogin.token,
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
