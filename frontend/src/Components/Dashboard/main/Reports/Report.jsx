import React from 'react'
import '../layout.css'
import '../container/content.css'
import './ReportLayout.css'
import Stats from './reportComponent/Stats'
import Profit from './reportComponent/Profit'
import RevenueReport from './reportComponent/RevenueReport'
const Report = () => {
  return (
      <div className='layout-content'>
        <div>
          <div className='row'>
            <Stats/>
            <Profit/>
            <RevenueReport/>
          </div>
        </div>
      </div>
  )
}

export default Report
