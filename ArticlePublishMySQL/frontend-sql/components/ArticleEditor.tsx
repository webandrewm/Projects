import React from 'react'
import dynamic from 'next/dynamic'
import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import s from './ArticleEditor.module.css'
import { setAuthor } from '@/reduxlogic/Slices/ArticleSlice'
import { setArtName, setArtText } from '@/reduxlogic/Slices/ArticleSlice'
import { editOneArticle } from '@/reduxlogic/Slices/MyArticles'
import { setArtIdForWatch } from '@/reduxlogic/Slices/RoutingSlice'
import { getOneArt } from '@/reduxlogic/Slices/ArticleSlice'
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
const ArticleEditor = () => {
  const { allArticles } = useAppSelector((state) => state.artdata)
  const { responseLogin } = useAppSelector((state) => state.auth)
  const { author, articleName, articleText } = useAppSelector(
    (state) => state.artdata
  )
  const dispatch = useAppDispatch()
  return (
    <div className={s.mainDiv}>
      {allArticles !== undefined ? (
        <div className={s.textDiv}>
          <input
            onChange={(e) => dispatch(setAuthor(e.target.value))}
            defaultValue={allArticles[0].author}
            className={s.artInput}
            placeholder="Автор"
          ></input>
          <input
            onChange={(e) => dispatch(setArtName(e.target.value))}
            className={s.artInput}
            defaultValue={allArticles[0].articleName}
            placeholder="Название статьи"
          ></input>
          <QuillNoSSRWrapper
            style={{ height: '100%', margin: '10px' }}
            onChange={(e) => {
              dispatch(setArtText(e))
            }}
            modules={modules}
            defaultValue={allArticles[0].articleText}
            formats={formats}
            theme="snow"
          />
          <button
            onClick={async () => {
              await dispatch(
                editOneArticle({
                  id: allArticles[0].id,
                  author: author,
                  articleName: articleName,
                  articleText: articleText,
                  token: responseLogin.token,
                })
              )
              dispatch(setArtIdForWatch(allArticles[0].id))
              dispatch(getOneArt(allArticles[0].id))
            }}
            className={s.addArtButt}
          >
            Изменить
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ArticleEditor
