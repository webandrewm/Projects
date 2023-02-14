import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import Button from '@mui/material/Button'
import styles from '../styles/Home.module.css'
import {
  changePassword,
  clearResponse,
  getConfirmPass,
  getNewPass,
  getOldPass,
} from '../app/Slices/changeSlice'

const PersonelArea = () => {
  const { oldPass, newPass, confirmPass, responseChange } = useSelector(
    (state) => state.change
  )
  const dataStatus = useSelector((state) => state.auth.dataStatus)
  const { email, _id } = useSelector((state) => state.auth.userData)
  const [passMenu, setPassMenu] = useState(false)
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  useEffect(() => {
    dataStatus ? '' : router.push('/')
  }, [dataStatus])

  return (
    <>
      {dataStatus ? (
        <div className={styles.personelArea}>
          <h1>Account info</h1>
          <p>Your email: {email}</p>
          <Button
            style={{ backgroundColor: 'black' }}
            onClick={() => {
              passMenu ? setPassMenu(false) : setPassMenu(true)
              dispatch(clearResponse())
            }}
            variant="contained"
          >
            Change password
          </Button>

          {passMenu ? (
            <div className={styles.changePassDiv}>
              <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel
                    style={{ color: 'black' }}
                    htmlFor="outlined-adornment-password"
                  >
                    Old password
                  </InputLabel>
                  <OutlinedInput
                    onChange={(e) => {
                      dispatch(getOldPass(e.target.value))
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
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel
                    style={{ color: 'black' }}
                    htmlFor="outlined-adornment-password"
                  >
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    onChange={(e) => {
                      dispatch(getNewPass(e.target.value))
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
                    label="New Password"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel
                    style={{ color: 'black' }}
                    htmlFor="outlined-adornment-password"
                  >
                    Confirm new password
                  </InputLabel>
                  <OutlinedInput
                    onChange={(e) => {
                      dispatch(getConfirmPass(e.target.value))
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
                    label="Confirm new password"
                  />
                </FormControl>
                <div className={styles.changeButton}>
                  <Button
                    style={{ backgroundColor: 'black' }}
                    className={styles.changeButt}
                    onClick={() =>
                      dispatch(
                        changePassword({
                          id: _id,
                          password: newPass,
                          oldPass: oldPass,
                        })
                      )
                    }
                    variant="contained"
                  >
                    Change
                  </Button>

                  <p>{responseChange ? responseChange : ''}</p>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default PersonelArea
