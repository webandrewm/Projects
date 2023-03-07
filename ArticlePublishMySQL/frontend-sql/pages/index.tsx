import AddArticle from '@/components/AddArticle'
import ArticlesList from '@/components/ArticlesList'
import { RootState } from '@/reduxlogic/store'
import styles from '../styles/Home.module.css'
import { useSelector } from 'react-redux'
import { getArtList } from '@/reduxlogic/Slices/ArticleSlice'
import { useAppDispatch, useAppSelector } from '@/reduxlogic/hooks'
import MainPage from '@/components/MainPage'
import ShowOneArticle from '@/components/ShowOneArticle'
import { useEffect } from 'react'
import Registration from '@/components/Registration'
import RegistrationConfirm from '@/components/RegistrationConfirm'
import Login from '@/components/Login'
import MyArticles from '@/components/myArticles/MyArticles'
export default function Home() {
  const dispatch = useAppDispatch()
  const {
    registerSuccess,
    registerState,
    arcitclestate,
    articlelistState,
    oneArticleState,
    loginState,
    myArticlesState,
  } = useSelector((state: RootState) => state.routing)
  const allArticles = useAppSelector((state) => state.artdata.allArticles)
  useEffect(() => {
    if (!allArticles) {
      dispatch(getArtList())
    }
  }, [allArticles])
  return (
    <>
      <div className={styles.mainDiv}>
        {arcitclestate ? <AddArticle /> : ''}
        {!arcitclestate &&
        !registerState &&
        !articlelistState &&
        !oneArticleState &&
        !registerSuccess &&
        !loginState &&
        !myArticlesState ? (
          <MainPage />
        ) : (
          ''
        )}
        {articlelistState ? <ArticlesList /> : ''}
        {oneArticleState ? <ShowOneArticle /> : ''}
        {registerState ? <Registration /> : ''}
        {registerSuccess ? <RegistrationConfirm /> : ''}
        {loginState ? <Login /> : ''}
        {myArticlesState ? <MyArticles /> : ''}
      </div>
    </>
  )
}
