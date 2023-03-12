import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import {
  getArtList,
  getOneArt,
  resetAnswer,
  searchArticle,
} from '@/reduxlogic/Slices/ArticleSlice'
import { setArtIdForWatch } from '@/reduxlogic/Slices/RoutingSlice'
import { useEffect } from 'react'
import s from './ArticleList.module.css'

const ArticlesList = () => {
  const { allArticles, artLoadingStatus, sendingAnswer } = useAppSelector(
    (state) => state.artdata
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (allArticles.length > 0 && artLoadingStatus !== 'rejected') {
      dispatch(resetAnswer())
    }
  }, [allArticles])
  return (
    <>
      <div className={s.artDiv}>
        <input
          onChange={async (e) => {
            if (e.target.value.length >= 1) {
              setTimeout(async () => {
                await dispatch(searchArticle(e.target.value))
              }, 500)
            } else {
              await dispatch(getArtList())
            }
          }}
          placeholder="Найти статью"
        ></input>
        {allArticles.length > 0 && artLoadingStatus !== 'rejected' ? (
          allArticles.map((item, index) => {
            return (
              <div
                onClick={async () => {
                  dispatch(setArtIdForWatch(item.id))
                  dispatch(getOneArt(item.id))
                }}
                className={s.oneArtModule}
                key={index}
              >
                <h2 style={{ margin: '15px', textAlign: 'center' }}>
                  {item.articleName}
                </h2>
                <p style={{ margin: '15px' }}>Автор: {item.author}</p>
              </div>
            )
          })
        ) : (
          <p>{sendingAnswer ? sendingAnswer.message : ''}</p>
        )}
      </div>
    </>
  )
}

export default ArticlesList
