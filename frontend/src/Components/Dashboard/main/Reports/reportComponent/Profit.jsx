import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import Visitor from './Visitor'

const Profit = () => {
   const[prof,setProf] =useState({
          
    series: [{
        name: "Profit",
        data: [10, 100, 35, 150, 49, 162]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        sparkline:{
            enabled: true
        },
      },
      colors:['#00CFE8'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 3,
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      markers: {
        size: [7, 5]
      }
    //   xaxis: {
    //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    //   }
    },
  
  
  })
  return (
    <div className='col-lg-4 col-12 mb-4'>
        <div className='row'>
            <div className='col-12 mb-3'>
                <div className='card h-100'>
                    <div style={{position:'relative',padding:"24px"}}>
                        <div>
                            <h5 class="text-h5"> Profit </h5>
                            <span class="text-disabled text-sm">Last Month</span>
                        </div>
                        <div>
                            <ReactApexChart options={prof.options} series={prof.series} type="line" height={160} />
                        </div>
                        <div className='d-flex align-items-center justify-content-between mt-3'>
                            <h4 class="text-h4 text-center font-weight-medium"> 624k </h4>
                            <span class="text-sm text-success"> +8.24% </span>
                        </div>
                    </div>
                </div>
            </div>

            <Visitor/>
        </div>
    </div>
  )
}

export default Profit
