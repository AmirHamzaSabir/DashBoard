import sideData from './sidebarData.json'
import './sidebar.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
            <svg width="32" height="22" viewBox="0 0 34 24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00183571 0.3125V7.59485C0.00183571 7.59485 -0.141502 9.88783 2.10473 11.8288L14.5469 23.6837L21.0172 23.6005L19.9794 10.8126L17.5261 7.93369L9.81536 0.3125H0.00183571Z" fill="currentColor"></path>
              <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.17969 17.7762L13.3027 3.75173L17.589 8.02192L8.17969 17.7762Z" fill="#161616"></path>
              <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.58203 17.2248L14.8129 5.24231L17.6211 8.05247L8.58203 17.2248Z" fill="#161616"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25781 17.6914L25.1339 0.3125H33.9991V7.62657C33.9991 7.62657 33.8144 10.0645 32.5743 11.3686L21.0179 23.6875H14.5487L8.25781 17.6914Z" fill="currentColor"></path>
            </svg>
          </div>
          <div><h1>Vuexy</h1></div>
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
