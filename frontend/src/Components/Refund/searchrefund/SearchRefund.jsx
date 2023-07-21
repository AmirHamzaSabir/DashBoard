import React, { useState } from 'react'
import refund from './refund.json'
const SearchRefund = () => {
    const [searchRefund, setsearchRefund] = useState('')
    return (
        <div className='row'>
            <div className='col-12 mt-5 mb-3'>
                <h2>Search Refund Order</h2>
            </div>
            <div className='col-12'>
                <div>
                    <label htmlFor="brn" className='form-label mb-1 fs-6'>Reference No or Contact number* :</label>
                </div>
                <input type="number" value={searchRefund} onChange={(e) => setsearchRefund(e.target.value)} id="brn" required className="bank-input w-100" />
            </div>

            <div className='col-12'>
                {
                    refund.filter((val) => {
                        return searchRefund == '' ? '' : val.bankreferenceno.toLowerCase().includes(searchRefund) || val.phoneno.toLowerCase().includes(searchRefund)
                    }).map((val) => (
                        <div className="row">
                            <div className='col-12'>
                                <div className='d-flex flex-wrap justify-content-between gap-y-5 p-24'>
                                    <div>
                                        <h2 className="heading">{val.productname} Qty : {val.quantity}</h2>
                                        <p className="mr-05">{val.customername}</p>
                                        <p className="mr-05">{val.customeraddress}</p>
                                        <p className="mr-05">{val.email}</p>
                                        <p className="mr-05">{val.phoneno}</p>
                                    </div>
                                    <div>
                                        <div className="orderid--container">
                                            <span style={{ fontWeight: "500" }}>Order ID # <span>{val.orderno}</span></span>
                                        </div>
                                        <div>
                                            <div
                                                htmlFor="status"
                                                style={{
                                                    marginTop: "1rem",
                                                    fontSize: "1.2rem",
                                                    fontWeight: '500',
                                                    marginBottom: ".5rem"
                                                }}
                                            >
                                                Refund Status :
                                            </div>
                                            <div className='fs-5'>{val.status}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='d-flex flex-wrap justify-content-end gap-y-5 p-24'>
                                    <div class="my-2 mx-sm-4">
                                        <table>
                                            <tr>
                                                <td class="text-end">
                                                    <div class="me-0">
                                                        <p class="mb-2 fs-4"> Total: </p>
                                                    </div>
                                                </td>
                                                <td class="font-weight-medium text-high-emphasis">
                                                    <div className="me-5">
                                                        <p class="mb-2 fs-4"> PKR {val.refundamount} </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchRefund

