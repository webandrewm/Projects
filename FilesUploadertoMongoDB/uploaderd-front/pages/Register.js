import axios from 'axios'
import React from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getServerAnswer, serverOk } from '../app/Slices/RegisterSlice'
import { setError, getEmail, getPass } from '../app/Slices/RegisterSlice'
import { useSelector } from 'react-redux'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
const Register = () => {
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const [showPassword, setShowPassword] = useState(false)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const { email, password } = useSelector((state) => state.register.userdata)
  const errorCase = useSelector((state) => state.register.errorCase)
  const router = useRouter()
  const dispatch = useDispatch()
  const toRegister = async () => {
    await axios
      .post('http://localhost:4444/registr', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res) {
          dispatch(getServerAnswer(res))
        }
        dispatch(serverOk(true))
        router.push('/Success')
      })
      .catch((err) => {
        dispatch(serverOk(false))
        dispatch(setError(err.response.data.message))
      })
  }

  return (
    <>
      <h1 className={styles.loginHead}>Registration</h1>
      <div className={styles.loginDiv}>
        <div className={styles.auxDiv1}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel
              style={{ color: 'black' }}
              htmlFor="outlined-adornment-password"
            >
              Email
            </InputLabel>
            <OutlinedInput
              onChange={(e) => {
                dispatch(getEmail(e.target.value))
              }}
              id="Email"
              type="text"
              label="Email"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel
              style={{ color: 'black' }}
              htmlFor="outlined-adornment-password"
            >
              Old password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => {
                dispatch(getPass(e.target.value))
              }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old password"
            />
          </FormControl>
        </div>
        <div className={styles.auxDiv2}>
          <button
            onClick={() => {
              toRegister()
            }}
            className={styles.buttonLogin}
          >
            Register
          </button>
          <button
            onClick={() => {
              dispatch(setError(''))
              router.push('/')
            }}
            className={styles.buttonLoginMain}
          >
            Main page
          </button>
        </div>
        <div className={styles.auxDiv2}>{`${errorCase ? errorCase : ''}`}</div>
      </div>
    </>
  )
}

export default Register
