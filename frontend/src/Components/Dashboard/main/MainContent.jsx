import React,{useEffect} from 'react'
import './layout.css'
import Mainlayout from './container/Mainlayout'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const MainContent = () => {
  const { user } = useSelector(state => state.auth);
  // use navigation 
  const navigate = useNavigate()
  // redirect back to the login, if no user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  },[navigate,user])
  return (
    <>
      <Mainlayout/>
    </>
  )
}

export default MainContent


