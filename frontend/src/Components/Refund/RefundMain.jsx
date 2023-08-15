import { Button, Input, Label } from 'reactstrap'
import './refund.css'
import SearchRefund from './searchrefund/SearchRefund'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
const RefundMain = () => {
    const {id} = useParams();
    const [formFields, setFormFields] = useState({
        orderNo: `${id !== undefined ?id:""}`,

      });
      const {orderNo} = formFields;
    
  return (
    <div className="layout-content">
        <div>
            <div className="row">
                <div className='col-12'>
                    <div className="card p-24">
                        <div className="col-12 mb-3">
                            <h2>Refund</h2>
                        </div>
                        <form className='row'>
                            <div className="col-12 col-md-4 col-lg-4 mb-3">
                                <div>
                                    <Label htmlFor="brn" className='form-label mb-3 fs-5'>Order Reference No: </Label>
                                </div>
                                <Input type="text" id="brn" required className="bank-input w-100" value={orderNo}/>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mb-3">
                                <div>
                                    <Label htmlFor="refund" className='form-label mb-3 fs-5'>Refund Amount: </Label>
                                </div>
                                <Input type="number" id="refund" required className="bank-input w-100"/>
                            </div>
                            <div className="col-12 mb-3">
                                <div>
                                    <Label htmlFor="rto" className='form-label mb-0 fs-5'>Refund to: </Label>
                                    <p className='color-78' style={{fontSize:".875rem"}}>bank account*</p>
                                </div>
                                <Input type="number" id="rto" required className="bank-input w-100"/>
                            </div>
                            <div className='col-12'>
                                <Button type='submit'  className='btn btn-dark'>
                                    Refund
                                </Button>
                            </div>
                        </form>
                        {/* <SearchRefund/> */}
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default RefundMain
