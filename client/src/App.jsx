import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Index'
import Chat from './pages/chat/Index'
import Profile from './pages/profile/Index'
import { useAppStore } from './store'
import apiClient from './lib/api-client'
import { GET_USER_INFO } from './lib/constants'

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to={`/auth`} />
}

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to={`/chat`} /> : children
}

const App = () => {

  const { userInfo, setUserInfo } = useAppStore()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get(GET_USER_INFO, { withCredentials: true })
        console.log(res)
        if (res.status === 200 && res.data.id) {
          setUserInfo(res.data)
        } else {
          setUserInfo(undefined)
        }
      } catch (error) {
        setUserInfo(undefined)
        console.log({ error })
      } finally {
        setLoading(false)
      }
    }
    if (!userInfo) {
      getUserData()
    } else {
      setLoading(false)
    }

  }, [userInfo, setUserInfo])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />

        <Route path='*' element={<Navigate to={`/auth`} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
