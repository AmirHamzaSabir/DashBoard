import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useState } from 'react'
const Earnreport = () => {
    const[sales,setSales] = useState({
          
        series: [{
          data: [44, 55, 41, 67, 22, 43, 21]
        }],
        options: {
          chart: {
            height: 210,
            width: 302,
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
              borderRadius: 2,
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
        <div className='report-card'>
            <div className='report-card-item'>
                <div class="report-title">Earning Reports</div>
                <div class="report-subtitle">Weekly Earnings Overview</div>
            </div>
        </div>
        <div className='pad-24' style={{paddingTop:"0"}}>
                <div className='row'>
                    <div className='col-sm-5 col-12 d-flex flex-column align-self-end'>
                        <div className='d-flex align-items-center gap-2'>
                            <h4 class="text-4xl font-weight-medium"> ₹ 468 </h4>
                            <span className='report-profit'>+4.2</span>
                        </div>
                        <p class="text-sm"> You informed of this week compared to last week </p>
                    </div>
                    <div className='col-sm-7 col-12' style={{position:"relative"}}>
                        <ReactApexChart options={sales.options} series={sales.series} type="bar" height={190} />
                    </div>
                </div>
                <div className='all-earning'>
                    <div className='row'>
                        <div className='col-sm-4 col-12'>
                            <div className='d-flex align-items-center'>
                                <div className='dollar'>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.7 8A3 3 0 0 0 14 6h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1-2.7-2M12 3v3m0 12v3"></path></svg>
                                </div>
                                <h6 className='text-align'>Earnings</h6>
                            </div>
                            <h4 class="text-val">₹ 545.69</h4>
                        </div>

                        <div className='col-sm-4 col-12'>
                            <div className='d-flex align-items-center'>
                                <div className='dollar pro'>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                    <path d="M12 3v9h9"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path></g></svg>
                                </div>
                                <h6 className='text-align'>Profit</h6>
                            </div>
                            <h4 class="text-val">₹ 350.69</h4>
                        </div>

                        <div className='col-sm-4 col-12'>
                            <div className='d-flex align-items-center'>
                                <div className='dollar exp'>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 13h2.5c2.5 0 5-2.5 5-5c0-3-1.9-5-5-5H7c-.5 0-1 .5-1 1L4 18c0 .5.5 1 1 1h2.8L9 14c.1-.6.4-1 1-1zm7.5-5.8C19.2 8.2 20 10 20 12c0 2.5-2.5 4.5-5 4.5h-2.6l-.6 3.6a1 1 0 0 1-1 .8H8.1a.5.5 0 0 1-.5-.6l.2-1.4"></path></svg>
                                </div>
                                <h6 className='text-align'>Expense</h6>
                            </div>
                            <h4 class="text-val">₹ 30.13</h4>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Earnreport
