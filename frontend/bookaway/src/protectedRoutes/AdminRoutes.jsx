import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  return user !== null 
  && user.isAdmin ? <Outlet/> 
  : navigate('/login')


}

export default AdminRoutes
