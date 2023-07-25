import React from 'react'

const Addbill = () => {
    return (
        <div className='m-3'>
            <h6 class="color-78 mb-3"> Bill To: </h6>
            <table>
                <tbody>
                    <tr>
                        <td class="pe-6 pb-1 ps-0 color-68"> Total Due: </td>
                        <td class="font-weight-medium pb-1  color-68">₹ 12,110.55</td>
                    </tr>
                    <tr>
                        <td class="pe-6 pb-1 ps-0  color-68"> Bank Name: </td>
                        <td class="pb-1  color-68">American Bank</td>
                    </tr>
                    <tr>
                        <td class="pe-6 pb-1 ps-0  color-68"> Country: </td>
                        <td class="pb-1  color-68">United States</td>
                    </tr>
                    <tr>
                        <td class="pe-6 pb-1 ps-0 color-68"> IBAN: </td>
                        <td class="pb-1  color-68">ETD95476213874685</td>
                    </tr>
                    <tr>
                        <td class="pe-6 pb-1 ps-0  color-68"> SWIFT Code: </td>
                        <td class="pb-1 color-68">BR91905</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Addbill
