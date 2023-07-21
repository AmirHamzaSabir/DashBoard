import PaymentBrand from './PaymentBrand'
import paypal from '../../../../images/paypal.png'
import wallet from '../../../../images/wallet.png'
import creditCard from '../../../../images/creditCard.png'
import './payment.css'
const PaymentComp = () => {
  return (
    <div className='col-12 col-md-4 col-lg-4 mb-4'>
        <div className='card h-100'>
            <div className='pad'>
                <div className='payment--heading'>
                    <div>
                        <h5 className="MuiTypography-root MuiTypography-h5 css-kw4zy4">Payment Gateways</h5>
                        <h6 className="outline--txt">Platform For Income</h6>
                    </div>
                </div>
                <div className='payment--container'>
                    <PaymentBrand img={paypal} name={'Paypal'} val={6235} brandName={"Big Brands"}/>
                    <PaymentBrand img={wallet} name={'Wallet'} val={345} brandName={'Bill payment'}/>
                    <PaymentBrand img={creditCard} name={'Credit Card'} val={856} brandName={'Money reversed'}/>
                    <PaymentBrand img={wallet} name={'Refund'} val={954} brandName={'Bill payment'}/>
                    <PaymentBrand img={wallet} name={'Wallet'} val={345} brandName={'Bill payment'}/>
                    <PaymentBrand img={paypal} name={'Paypal'} val={6235} brandName={"Big Brands"}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentComp
