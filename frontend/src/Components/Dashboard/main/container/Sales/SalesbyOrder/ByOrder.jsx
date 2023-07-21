import React from 'react'
import ByOrderNav from './ByOrderNav'
import './salesbyorder.css'
import Nav from './Nav'
import DetailComp from './DetailComp'
const ByOrder = () => {
  return (
    <div className='col-12 col-md-6 mb-4'>
        <div className='card h-100'>
            <ByOrderNav/>
            <Nav/>
            <DetailComp/>
        </div>
    </div>
  )
}

export default ByOrder
