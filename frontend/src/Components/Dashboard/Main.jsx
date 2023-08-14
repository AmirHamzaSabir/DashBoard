import React, { useContext, useEffect,useState } from 'react'
import './dashboard.css'
import './main/layout.css'
import Sidebar from './sidebar/Sidebar'
import Header from './main/Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  // use navigation 
  const navigate = useNavigate()
  // redirect back to the login, if no user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  },[navigate,user])
  return (
    <>
    <div className='app'>
      <Sidebar show={false} name={"topLevel"}/>
      <div className='mainLayout'>
        <Header/>
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default Dashboard


