import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
const TotalEarn = () => {
    const[sales,setSales] = useState({
          
        series: [{
          data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
        }],
        options: {
          chart: {
            height: 210,
            type: 'bar',
            toolbar:{
                show:false,
            },
            sparkline:{
                enabled: true
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 5,
              columnWidth: '40%',
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 2
          },
          colors:['#7367F0'],
          grid: {
            row: {
              colors: ['#fff', '#f2f2f2']
            }
          },
          xaxis: {
            labels: {
              rotate: -45
            },
            
            tickPlacement: 'on'
          },
          yaxis: {
            title: {
              text: 'Servings',
            },
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
            <div className='card-item pb-0'>
                <div className='card-item-content'>
                    <div data-v-df741ecb="" class="card-title">Total Earning</div>
                    <div className='d-flex align-items-center'>
                        <h4 class="text-h1 me-2"> 97% </h4>
                        <div className='upward-icon'>
                            <svg data-v-df741ecb="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 15l6-6l6 6"></path>
                            </svg>
                            <span  class="text-base">25.8%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{position:"relative"}}>
                <div className='pad chart-h'>
                    <ReactApexChart options={sales.options} series={sales.series} type="bar" height={120} />
                </div>
                <div>
                    <div className='sales-content'>
                        <div className='sales-content-item'>
                            <div className='sales-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.7 8A3 3 0 0 0 14 6h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1-2.7-2M12 3v3m0 12v3"></path></svg>
                            </div>
                            <div className='sales-value'>
                                <div class="sale-item-title">Total Sales</div>
                                <div class="sale-item-subtitle text-disabled">Total Sales</div>
                            </div>
                            <div className='sale-profit'>
                                <span data-v-df741ecb="" class="text-success font-weight-medium">+PKR 98</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TotalEarn
