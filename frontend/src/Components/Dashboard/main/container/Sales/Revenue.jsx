import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
const Revenue = () => {
    const [evenueChart,setChart] = useState({
          
        series: [{
          name: 'Revenue',
          data: [31, 40, 90, 120, 150, 190, 250]
        }],
        options: {
          chart: {
            toolbar:{
                show:false,
            },
            sparkline:{
                enabled: true
            },
            width:'279',
            height: '97',
            type: 'area'
          },
          colors:['#28C76F','#DCF6E8'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width:2,
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
        },
      
      })
  return (
    <div className='col-sm-12 col-md-6 col-lg-6 mb-4'>
        <div className='card h-100'>
            <div className='d-flex flex-column pad pb-0'>
                <div className='wallet'>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm0 2h18M7 15h.01M11 15h2"></path>
                    </svg>
                </div>
                <h6 class="text-lg font-weight-medium">97.5k</h6>
                <span class="text-sm">Revenue Generated</span>
            </div>
            <div style={{minHeight:"84px"}}>
                <ReactApexChart options={evenueChart.options} series={evenueChart.series} type="area" height={87} />
            </div>
        </div>
    </div>
  )
}

export default Revenue
