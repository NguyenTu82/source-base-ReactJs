import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LocalStorage from '../../utils/storage'
import Request from '../../utils/request'
import { login, loginSuccess } from '../../slice/auth'

function Login() {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogin = () => {
    const payload = {
      email: 'nguyenhuy1997@yopmail.com',
      password: '123123'
    }

    login(payload).then((res) => {
      if (res.success) {
        LocalStorage.set('ACCESS_TOKEN', res.result?.token)
        Request.setAccessToken(res.result?.token)
        dispatch(loginSuccess(res.result))
        history.push('/')
      }
    })
  }

  return (
    <div>
      <Button onClick={handleLogin}>login</Button>
    </div>
  )
}

export default Login
