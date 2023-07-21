import React from 'react'

const TransRow = ({img,cardNo,date,status,trend}) => {
    return (
        <tr>
            <td style={{ padding: "0.65rem" }}>
                <div className='d-flex align-items-center'>
                    <div style={{ marginInlineEnd: '12px' }}>
                        <div className='transaction--card' style={{ width: '50px' }}>
                            <img src={img} alt="visa" className='card-img' />
                        </div>
                    </div>
                    <div>
                        <p class="text mb-0">*{cardNo}</p>
                        <p class="text-sm mb-0">Credit</p>
                    </div>
                </div>
            </td>

            <td>
                <p class="text mb-0"> Sent </p>
                <span class="text-sm">{date}</span>
            </td>

            <td>
                <span className={`status ${status == 'Verified' && "status-success"} ${status == 'Rejected' && "status-error"} ${status == 'Pending' && "status-pending"}`} >
                    {status}
                </span>
            </td>

            <td>
                <span class="text">{trend}</span>
            </td>
        </tr>
    )
}

export default TransRow
