import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import {
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Loading } from '@nextui-org/react'
import { setOneFileStatus, setStatus } from '../app/Slices/GetSlice'

let source = axios.CancelToken.source()

const OneFile = ({ file }) => {
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState('')
  const [percentage, setPercentage] = useState(0)
  const [timer, setTimer] = useState(false)
  const [time, setTime] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        setTime((prevCounter) => prevCounter + 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timer])

  const deleteOne = async (id, name) => {
    try {
      axios.delete(`http://localhost:4444/delete/${id}/${name}`).then((res) => {
        dispatch(setOneFileStatus(`${name} ${res.data.message}`))
        dispatch(setStatus(''))
      })
    } catch (err) {
      console.log(err)
    }
    dispatch(setOneFileStatus(''))
  }

  const onButtonClick = async (id, name) => {
    source = axios.CancelToken.source()
    setTime(0)
    setTimer(true)
    setError('')
    setInProgress(true)
    try {
      await axios
        .request({
          url: `http://localhost:4444/download/${id}/${name}`,
          method: 'GET',
          responseType: 'blob',
          cancelToken: source.token,
          onDownloadProgress: function (progressEvent) {
            setPercentage(
              ((progressEvent.loaded / file.length) * 100).toFixed(0)
            )
          },
        })
        .then(({ data }) => {
          const downloadUrl = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.href = downloadUrl
          link.setAttribute('download', name)
          document.body.appendChild(link)
          link.click()
          link.remove()
          setInProgress(false)
          setPercentage(0)
          setTime(0)
          setTimer(false)
        })
    } catch (err) {
      setTime(0)
      setTimer(false)
      setError(err.message)
      setInProgress(false)
      setPercentage(0)
    }
  }

  return (
    <div>
      <Card className={styles.cardsDiv} elevation={2}>
        <CardContent className={styles.carContent}>
          <Typography gutterBottom variant="h5" component="h1">
            {file.filename}
          </Typography>

          <LinearProgress variant="determinate" value={percentage} />
        </CardContent>
        <ul className={styles.cardList}>
          <Typography variant="body2" color="textSecondary" component="p">
            size: <b>{(file.length / 1048576).toFixed(2)} MB</b>
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            elapsed: <b>{time > 0 ? `${time} s` : ''}</b>
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            status:{' '}
            <b>
              {percentage > 0 && inProgress
                ? `downloading...`
                : !inProgress
                ? ''
                : `connecting to database...`}
            </b>
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            percentage: <b>{percentage > 0 ? `${percentage} %` : ''}</b>
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            error: <b>{error}</b>
          </Typography>

          {inProgress ? (
            <div className={styles.progressDiv}>
              <Loading />
            </div>
          ) : (
            ''
          )}
        </ul>

        <Button
          download
          size="small"
          color="primary"
          onClick={() => {
            onButtonClick(file._id, file.filename)
          }}
        >
          Download file
        </Button>
        <Button
          disabled={!inProgress}
          size="small"
          color="primary"
          onClick={() => source.cancel('Canceled')}
        >
          Cancel download
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={(e) => {
            deleteOne(file._id, file.filename)
          }}
        >
          Delete file
        </Button>
      </Card>
    </div>
  )
}

export default OneFile
