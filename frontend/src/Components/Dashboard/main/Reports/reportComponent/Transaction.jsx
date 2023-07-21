import React from 'react'
import TransRow from './TransRow'
import visa from '../../../../../images/visa.png'
import mastercard from '../../../../../images/mastercard.png'
import americanExp from '../../../../../images/americanExp.png'
const Transaction = () => {
  return (
    <div className='col-md-6 col-12 mb-4'>
        <div className='card h-100'>
            <div className='card-item'>
                <div className='card-item-content'>
                    <div class="card-title">Recent Transactions</div>
                </div>
            </div>

            <hr class="divider" aria-orientation="horizontal" role="separator"></hr>

            <div className='table'>
                <div className='table--wrapper'>
                    <table>
                        <thead>
                            <tr>
                                <th className='text'>CARD</th>
                                <th className='text'>DATE</th>
                                <th className='text'>STATUS</th>
                                <th className='text'>TREND</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TransRow img={visa} cardNo={'4598'} date={'20 Mar 2023'} status={'Verified'} trend={'+2,563'}/>
                            <TransRow img={americanExp} cardNo={'4895'} date={'15 Apr 2023'} status={'Rejected'} trend={'-253'}/>
                            <TransRow img={mastercard} cardNo={'5489'} date={'13 May 2023'} status={'Pending'} trend={'+890'}/>
                            <TransRow img={visa} cardNo={'5278'} date={'7 Feb 2023'} status={'Verified'} trend={'+649'}/>
                            <TransRow img={mastercard} cardNo={'5123'} date={'20 Jan 2023'} status={'Verified'} trend={'-200'}/>
                            <TransRow img={mastercard} cardNo={'5489'} date={'13 May 2023'} status={'Pending'} trend={'+890'}/>
                            <TransRow img={visa} cardNo={'5278'} date={'7 Feb 2023'} status={'Verified'} trend={'+649'}/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Transaction
