import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import React from 'react'
import s from './MyArticles.module.css'
import { setArtIdForWatch } from '@/reduxlogic/Slices/RoutingSlice'
import { getOneArt } from '@/reduxlogic/Slices/ArticleSlice'
import { setAddArticle } from '@/reduxlogic/Slices/RoutingSlice'
import { deleteOneArticle } from '@/reduxlogic/Slices/MyArticles'
import { getMyArt } from '@/reduxlogic/Slices/MyArticles'
const MyArticles = () => {
  const dispatch = useAppDispatch()
  const { myArticles } = useAppSelector((state) => state.myart)
  const { responseLogin } = useAppSelector((state) => state.auth)

  return (
    <div className={s.artDiv}>
      {myArticles.length > 0 ? (
        myArticles.map((item, index) => {
          return (
            <div key={index} className={s.oneArtDiv}>
              <div
                onClick={async () => {
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
              <div>
                <button
                  onClick={async () => {
                    await dispatch(
                      deleteOneArticle({
                        id: item.id,
                        token: responseLogin.token,
                      })
                    )
                    await dispatch(getMyArt(responseLogin.token))
                  }}
                >
                  Удалить
                </button>
                <button>Редактировать</button>
              </div>
            </div>
          )
        })
      ) : (
        <div>
          <h1>У вас пока нет статей.</h1>
          <p>Вы можете создать статью прямо сейчас.</p>
          <button
            style={{ borderRadius: '5px' }}
            onClick={() => dispatch(setAddArticle())}
          >
            Создать статью
          </button>
        </div>
      )}
    </div>
  )
}

export default MyArticles
