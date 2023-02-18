import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import {
  authEmail,
  authPass,
  loginUser,
  removeErrors,
} from '../app/Slices/userLogin'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import { setError } from '../app/Slices/RegisterSlice'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
const Login = () => {
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const [showPassword, setShowPassword] = useState(false)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const [cookie, setCookie, removeCookie] = useCookies()
  const { email, password } = useSelector((state) => state.auth.userLogin)
  const { token } = useSelector((state) => state.auth.userData)
  const userData = useSelector((state) => state.auth.userData)
  const dataStatus = useSelector((state) => state.auth.dataStatus)
  const errorCase = useSelector((state) => state.auth.errorCase)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      return setCookie('auth', { token: token })
    }
  }, [userData])

  useEffect(() => {
    dataStatus ? router.push('/') : ''
  }, [dataStatus])

  return (
    <>
      <h1 className={styles.loginHead}>Log in</h1>
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
              onChange={(e) => dispatch(authEmail(e.target.value))}
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
                dispatch(authPass(e.target.value))
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
              dispatch(loginUser({ email: email, password: password }))
            }}
            className={styles.buttonLogin}
          >
            Login
          </button>
          <button
            onClick={() => {
              dispatch(setError(''))
              dispatch(removeErrors(''))
              router.push('/')
            }}
            className={styles.buttonLoginMain}
          >
            Main page
          </button>
        </div>
        <div className={styles.auxDiv3}>
          <p>
            Have no register? <Link href="/Register">Register</Link>
          </p>
        </div>
        <div className={styles.auxDiv2}>{`${errorCase ? errorCase : ''}`}</div>
      </div>
    </>
  )
}

export default Login
