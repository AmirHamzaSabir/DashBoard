import { useEffect, useState } from 'react'
import './header.css'
import avatar from '../../../../images/avatar.png'
import Overlay from './Overlay'
import Notification from './Notification'
import Hamburger from './Hamburger'
import Sidebar from '../../sidebar/Sidebar'
const Header = () => {
  const [profile, setProfile] = useState(false)
  const [notification, setNotification] = useState(false)
  const [toggleBtn, setToggleBtn] = useState(false)
  const [showBar, setShowBar] = useState(false)

  const handleReSize = () => {
    if (window.innerWidth <= 1120) {
      setToggleBtn(true)
    } else {
      setToggleBtn(false)
      setShowBar(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleReSize)
  },[toggleBtn])

  const toggleProfile = () => {
    setProfile((prevState) => !prevState);
    setNotification(false);
  }

  const toggleNotification = () => {
    setNotification((prevState) => !prevState);
    setProfile(false);
  }
  return (
    <>
      <div className='header-layout nav-blur'>
        <div className='navbar-container'>
          <div class="d-flex h-100 align-center background-style">
            {toggleBtn &&
              <div className='d-flex align-items-center justify-content-center'>
                  <Hamburger setShowBar={setShowBar} showBar={showBar}/>
              </div>}
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center'>
                <button className='search-icon'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24" style={{ fontSize: '26px', height: '26px', width: '26px' }}>
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"></path></svg>
                  </span>
                </button>
                <span className='d-none d-lg-flex align-items-center'>
                  <span className='me-3'>Search</span>
                  <span className='shortkey'>⌘K</span>
                </span>
              </div>
            </div>
            <div className='flex-grow-1'></div>
            <div className='d-flex align-items-center'>
              <button className='nav-icons'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" class="v-icon notranslate v-theme--light iconify iconify--tabler" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                      <path d="M4 5h7M9 3v2c0 4.418-2.239 8-5 8"></path><path d="M5 9c0 2.144 2.952 3.908 6.7 4m.3 7l4-9l4 9m-.9-2h-6.2"></path></g></svg>
                </span>
              </button>
              <button className='nav-icons'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" class="v-icon notranslate v-theme--light iconify iconify--tabler" width="1em" height="1em" viewBox="0 0 24 24" >
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.828 14.828a4 4 0 1 0-5.656-5.656a4 4 0 0 0 5.656 5.656zm-8.485 2.829l-1.414 1.414M6.343 6.343L4.929 4.929m12.728 1.414l1.414-1.414m-1.414 12.728l1.414 1.414M4 12H2m10-8V2m8 10h2m-10 8v2"></path></svg>
                </span>
              </button>
              <button className='nav-icons'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" class="v-icon notranslate v-theme--light iconify iconify--tabler" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 2h6m-3-3v6"></path></svg>
                </span>
              </button>
              <button className='nav-icons' onClick={toggleNotification}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" class="v-icon notranslate v-theme--light iconify iconify--tabler" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1"></path></svg>
                </span>
              </button>
              <div className='d-flex align-items-center' style={{ cursor: "pointer" }} onClick={toggleProfile}>
                <div className='avatar-img'>
                  <img src={avatar} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {profile && <Overlay />}
        {notification && <Notification />}
      </div>
      {showBar && <Sidebar show={showBar}/>}
    </>
  )
}

export default Header
