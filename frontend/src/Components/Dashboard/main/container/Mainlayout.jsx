import React from 'react'
import './content.css'
import Saleoverview from './Sales/Saleoverview'
import Revenue from './Sales/Revenue'
import TotalEarn from './Sales/TotalEarn'
import Earnreport from './Sales/Earnreport'
import ByOrder from './Sales/SalesbyOrder/ByOrder'
import Stats from '../Reports/reportComponent/Stats'
import RevenueReport from '../Reports/reportComponent/RevenueReport'
import Profit from '../Reports/reportComponent/Profit'
import Transaction from '../Reports/reportComponent/Transaction'
import Tablee from '../invoice/Table'
import Add from '../createInvoice/Add'
import BtnSection from '../createInvoice/BtnSection'
import PaymentComp from '../payment/PaymentComp'
const Mainlayout = () => {
    return (
        <div className='layout-content'>
            <div>
                <div className='row'>
                    <Saleoverview/>
                    <Revenue/>
                    <TotalEarn/>
                    <Earnreport/>
                    <Stats/>
                    <Profit/>
                    <RevenueReport/>
                    <ByOrder/>
                    <Transaction/>
                    <PaymentComp/>
                    <Tablee/>
                    <Add/>
                    <BtnSection/>
                </div>
            </div>
        </div>
    )
}

export default Mainlayout
