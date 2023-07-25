import sideData from './sidebarData.json'
import './sidebar.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import wire from '../../../images/wire.png'
const Sidebar = ({show}) => {
  const [toggle, setToggle] = useState(false)
  const [inVisibleSidebar, setInvisible] = useState(false)
  const toggleHandler = () => {
    if (window.innerWidth <= 1120) {
      setInvisible(true)
    } else {
      setInvisible(false)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", toggleHandler)
  }, [inVisibleSidebar])

  return (
    <div className={`${inVisibleSidebar ? "sidebar in--visible" : "sidebar"}`}>
      <div className='nav-header'>
        <Link to="/dashboard" className='nav-head'>
          <div>
          <img src={wire} alt="Khan Copper's" />
          </div>
          <div><h1>Khan Copper's</h1></div>
        </Link>
        <div className='nav-head-remove-add-btn'>
          {show ? 
            <div onClick={() => setInvisible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" role="button" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </div> :
          <svg xmlns="http://www.w3.org/2000/svg" role="button" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
              <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path></g>
          </svg>
          }
        </div>
      </div>
      <ul className='uls'>
        {sideData.map((item, index) => (
          item.child ?
            <li className={`${toggle ? 'nav-link open' : 'nav-link'}`} key={index}>
              <Link to={`${item.path}`}>
                <i className={`${item.icon} color-78 me-3`} style={{ fontSize: "25px" }}></i>
                <span className="nav-item-title">{item.title}</span>
                <i className={`bi bi-caret-right-fill color-78 toggle--btn ${toggle ? 'rotate' : ''}`} onClick={() => setToggle(!toggle)}></i>
              </Link>

              {item.child.map((val) => (
                <li className='child'>
                  <Link to={`${val.path}`}>
                    <i className={`${val.icon} color-78 me-3`} style={{ fontSize: "25px" }}></i>
                    <span className="nav-item-title">{val.title}</span>
                  </Link>
                </li>))}
            </li>
            :
            <li className="nav-link">
              <Link to={`${item.path}`} >
                <i className={`${item.icon} color-78 me-3`} style={{ fontSize: "25px" }}></i>
                <span className="nav-item-title">{item.title}</span>
              </Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
