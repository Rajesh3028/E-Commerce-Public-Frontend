import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

  let Auth = localStorage.getItem('user')
  return (
    Auth ? <Outlet/> : <Navigate to='/login' replace/>
  )
  
}

export default ProtectedRoutes
