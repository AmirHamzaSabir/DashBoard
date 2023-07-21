import React from 'react'
import InvoiceUpload from '../order/ViewDetails/InvoiceUpload'

const Upload = () => {
  return (
    <div className='layout-content'>
        <div>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <InvoiceUpload/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload
