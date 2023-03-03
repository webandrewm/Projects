import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import { getOneArt, searchArticle } from '@/reduxlogic/Slices/ArticleSlice'
import { setArtIdForWatch } from '@/reduxlogic/Slices/RoutingSlice'
import { useRouter } from 'next/router'
import s from './ArticleList.module.css'

const ArticlesList = () => {
  const router = useRouter()
  const { allArticles } = useAppSelector((state) => state.artdata)
  const dispatch = useAppDispatch()

  return (
    <>
      <div className={s.artDiv}>
        <input
          onChange={(e) => dispatch(searchArticle(e.target.value))}
          placeholder="Найти статью"
        ></input>
        {allArticles
          ? allArticles.map((item, index) => {
              return (
                <div
                  onClick={async () => {
                    console.log(item.id)
                    dispatch(setArtIdForWatch(item.id))
                    dispatch(getOneArt(item.id))
                  }}
                  className={s.oneArtModule}
                  key={index}
                >
                  <h1 style={{ margin: '15px', textAlign: 'center' }}>
                    {item.articleName}
                  </h1>
                  <p style={{ margin: '15px' }}>Автор: {item.author}</p>
                </div>
              )
            })
          : ''}
      </div>
    </>
  )
}

export default ArticlesList
