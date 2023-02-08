import styles from '../styles/Home.module.css'
import {
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from '@material-ui/core'
import { Input } from '@nextui-org/react'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFileList,
  setFileSize,
  setPercentage,
  setStatus,
} from '../app/Slices/GetSlice'
import OneFile from '../components/OneFile'
import { Loading } from '@nextui-org/react'
import { setTime, setTimer } from '../app/Slices/GetSlice'
import { useRouter } from 'next/router'
import StartPage from './StartPage'

let source = axios.CancelToken.source()

export default function Home() {
  const { email } = useSelector((state) => state.auth.userData)
  const dataStatus = useSelector((state) => state.auth.dataStatus)
  const { fileList, status, fileSize, time, timer, percentage, oneFileStatus } =
    useSelector((state) => state.data)
  const dispatch = useDispatch()
  const inputRef = useRef()
  const router = useRouter()
  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        dispatch(setTime(1))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timer])

  useEffect(() => {
    if (dataStatus === true) {
      return async () => {
        if (dataStatus === true) {
          let filelist = await axios.post('http://localhost:4444/getlist', {
            email: email,
          })
          dispatch(getFileList(filelist.data))
        }
      }
    }
  }, [dataStatus, oneFileStatus, status])

  const uploadDatas = async (event) => {
    dispatch(setStatus(''))
    source = axios.CancelToken.source()
    try {
      dispatch(setTimer(true))
      dispatch(setStatus('Uploading...'))
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('file', file)
      formData.append('body', email)
      dispatch(setFileSize(file.size))
      await axios
        .post('http://localhost:4444/uploads', formData, {
          cancelToken: source.token,
          onUploadProgress: (progressEvent) => {
            dispatch(
              setPercentage((progressEvent.loaded / file.size) * 100 - 30)
            )
          },
        })
        .then((res) => {
          dispatch(setStatus(res.data.message))
          dispatch(setFileSize(0))
          dispatch(setPercentage(percentage + 15))
          dispatch(setTimer(false))
          dispatch(setPercentage(percentage + 15))
          dispatch(setTime(0))
          dispatch(setPercentage(0))
        })
    } catch (err) {
      dispatch(setTimer(false))
      dispatch(setStatus(err.message))
      dispatch(setTime(0))
      dispatch(setPercentage(0))
      dispatch(setFileSize(0))
    }
    inputRef.current.value = null
  }

  return (
    <>
      {dataStatus ? (
        <div>
          <Card className={styles.cardsDiv} elevation={2}>
            <CardContent>
              <Typography
                className={styles.h1head}
                gutterBottom
                variant="h5"
                component="h1"
              >
                Choose file to upload
              </Typography>
              <LinearProgress variant="determinate" value={percentage} />
            </CardContent>
            <ul className={styles.cardList}>
              <Typography variant="body2" color="textSecondary" component="p">
                size: <b>{fileSize > 0 ? `${fileSize.toFixed(2)}  MB` : ''} </b>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                elapsed: <b>{time > 0 ? `${time} s` : ''}</b>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                status:
                <b>{status}</b>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                percentage:{' '}
                <b>{percentage > 0 ? `${percentage.toFixed(0)} %` : ''}</b>
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                error: <b></b>
              </Typography>
              {status === 'Uploading...' ? (
                <div className={styles.progressDiv}>
                  <Loading />
                </div>
              ) : (
                ''
              )}
            </ul>

            <Button
              disabled={status === 'Uploading...' ? true : false}
              onClick={() => {
                if (dataStatus) {
                  inputRef.current.click()
                } else {
                  router.push('/Login')
                }
              }}
            >
              Click to upload
            </Button>
            <Input
              id="1"
              ref={inputRef}
              onChange={(e) => {
                uploadDatas(e)
              }}
              aria-label="for files"
              type="file"
              hidden
            ></Input>
            <Button
              id="2"
              disabled={status.lenght > 1}
              onClick={() => source.cancel('Canceled')}
              size="small"
              color="primary"
            >
              Cancel upload
            </Button>
          </Card>
          <div className={styles.deleteStatusDiv}>
            <Typography variant="body2" color="textSecondary" component="p">
              {oneFileStatus}
            </Typography>
          </div>
          {fileList && dataStatus
            ? fileList.map((file, index) => {
                return <OneFile file={file} key={file._id} />
              })
            : ''}
        </div>
      ) : (
        <StartPage />
      )}
    </>
  )
}
