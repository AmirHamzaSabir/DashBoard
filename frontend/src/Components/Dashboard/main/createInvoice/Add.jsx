import React from 'react'
import YourAddress from './addDetail/YourAddress'
import InvoiceIssueTime from './addDetail/InvoiceIssueTime'
import AddEmp from './adddesc/AddEmp'
import Addbill from './adddesc/Addbill'
import Itemform from './AddItems/Itemform'
import Additembtn from './AddItems/Additembtn'
import SalePerson from './saledetails/SalePerson'
import TotalItemCost from './saledetails/TotalItemCost'
import {TextareaAutosize } from "@mui/material"
import { styled } from '@mui/system';
const Add = () => {
    const StyleTextArea = styled(TextareaAutosize)(
        () => `width: 100%; 
        padding: 12px;
        font-size:.975rem;
        color: rgba(47,43,61,.68);
        border-radius:6px;
        `
    )
  return (
    <div className='col-md-9 col-12 mb-4'>
        <div className='card'>
            <div className='d-flex flex-wrap justify-content-between gap-y-5 p-24'>
                <YourAddress/>  
                <InvoiceIssueTime/>
            </div>
            <hr style={{height:"0"}} />
            <div className='d-flex flex-wrap justify-content-between gap-y-5 p-24'>
                <AddEmp/>
                <Addbill/>
            </div>
            <hr style={{height:"0"}} />
            <div className='p-24'>
                <Itemform/>
                <Additembtn/>
            </div>
            <hr style={{height:'0'}}/>
            <div className='d-flex flex-wrap justify-content-between gap-y-5 p-24'>
                <SalePerson/>
                <TotalItemCost/>
            </div>
            <hr style={{height:'0'}}/>
            <div className='p-24 mx-1'>
                <p class="mb-2 color-78" style={{fontSize:".8125rem",fontWeight:"500"}}> Note: </p>   
                <div>
                    <StyleTextArea minRows={2} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Add





