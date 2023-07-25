import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
const RevenueReport = () => {
    const[sales,setSales] = useState({
          
        series: [{
            name:"Revenue",
            data: [44, 55, 41, 67, 22, 43, 21, 33, 45]
        }],
        labels:["Revenue"],
        options: {
          chart: {
            width:410,
            height: 312,
            type: 'bar',
            toolbar:{
                show:false,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 7,
              columnWidth: '30%',
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
            categories:['Jan','Feb','Mar','Apr','May','Jun',"Jul","Aug","Sep"],
            labels: {
              rotate: -45
            },
            
            tickPlacement: 'on'
          },
          legend:{
            show: false,
          },      
          grid: {
            show: false,
          },
        },
      
      
      })

      const [revenReport,setReport] = useState({
          
        series: [{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        }],
        options: {
          chart: {
            height: 115,
            type: 'area',
            toolbar:{
                show:false,
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          colors:['#7367F0'],
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
    <div className="col-lg-8 col-12 mb-4">
        <div className="card">
            <div className="row">
                <div className="col-sm-8 col-lg-8 col-12">
                    <div style={{position:"relative",padding:"24px"}}>
                        <h5 class="text-h5 mb-6"> Revenue Report </h5>
                        <div style={{minHeight:'312px'}}>
                        <ReactApexChart options={sales.options} series={sales.series} type="bar" height={312} />
                        </div>
                    </div>
                </div>

                <div className='col-sm-4 col-12'>
                    <div className='d-flex flex-column justify-content-center align-items-center h-100' style={{position:"relative",padding:"24px"}}>
                        <div className='d-flex flex-column'>
                        <h3 class="font-weight-medium text-h3"> ₹ 25,825 </h3>
                            <p>
                                <span class="text-high-emphasis font-weight-medium me-1">Budget:</span>
                                <span>56,800</span>
                            </p>
                        </div>
                        <div style={{minHeight:"115px"}}>
                            <ReactApexChart options={revenReport.options} series={revenReport.series} type="area" height={115} />    
                        </div>
                        <button className='budget-btn'>
                        <span> Increase Budget </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RevenueReport
