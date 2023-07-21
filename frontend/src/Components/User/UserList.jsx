import { Outlet } from 'react-router-dom'
import Sidebar from '../Dashboard/sidebar/Sidebar'
import Header from '../Dashboard/main/Header/Header'
const UserList = () => {
  return (
    <div className='app'>
      <Sidebar/>
      <div className='mainLayout'>
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserList
