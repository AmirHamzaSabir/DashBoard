import React, { useState,useEffect } from 'react';
import { FormControl, Select, MenuItem, TextareaAutosize, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { postInvoice, reset } from '../../../../features/invoice/invoiceSlice';
import { getAllUsers } from '../../../../features/auth/authSlice';
import { getProducts } from '../../../../features/products/productSlice';
import Spinner from '../../../Spinner/Spinner';

const MainInvoice = () => {
const [formFields, setFormFields] = useState({
issueDate: '',
dueDate: '',
user: '',
item: '',
cost: '',
quantity: '',
description: '',
salesPerson: '',
message: '',
note: ''
});

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormFields((prevState) => ({
...prevState,
[name]: value
}));
};

  const { allUsers } = useSelector(state => state.auth);
  const { products } = useSelector(state => state.product);

const handleSelectChange = (e) => {
const { name, value } = e.target;
setFormFields((prevState) => ({
...prevState,
[name]: value
}));
};

  const { issueDate,
    dueDate,
    user,
    item,
    cost,
    quantity,
    description,
    salesPerson,
    message,
    note
  } = formFields;

  const dispatch = useDispatch();
  const { invoice, i_isLoading, isError } = useSelector(state => state.invoice);

    useEffect(() => {
      if(isError){
        alert('An Error Occured');
      }
    dispatch(getAllUsers());
    dispatch(getProducts());
      dispatch(reset());
  },[])
  const handleSubmit = (e) => {
    // e.preventDefault();
    const invoiceData = {
      issueDate,
      dueDate,
      user,
      item,
      cost,
      quantity,
      description,
      salesPerson,
      message,
      note
    }
    const invoice = dispatch(postInvoice(invoiceData))
    if(invoice){
      alert('Successfully Inserted')
    }else{
      alert('an error occured')
    }
    // console.log(invoiceData);
}

if(i_isLoading){
  return <Spinner/>
}
return (
<div className='layout-content'>
  <div>
    <div className='row'>
      <div className='col-md-9 col-12 mb-4'>
        <div className='card'>
          <div className='d-flex flex-wrap justify-content-between gap-y-5 p-24'>
            <div className='m-3'>
              <div className='d-flex align-items-center mb-3'>
                <div className='me-3' style={{ lineHeight: '0', color: 'rgb(115,103,240)' }}>
                  <svg width='32' height='22' viewBox='0 0 34 24' fill='none'>
                    <path fillRule='evenodd' clipRule='evenodd'
                      d='M0.00183571 0.3125V7.59485C0.00183571 7.59485 -0.141502 9.88783 2.10473 11.8288L14.5469 23.6837L21.0172 23.6005L19.9794 10.8126L17.5261 7.93369L9.81536 0.3125H0.00183571Z'
                      fill='currentColor'></path>
                    <path opacity='0.06' fillRule='evenodd' clipRule='evenodd'
                      d='M8.17969 17.7762L13.3027 3.75173L17.589 8.02192L8.17969 17.7762Z' fill='#161616'></path>
                    <path opacity='0.06' fillRule='evenodd' clipRule='evenodd'
                      d='M8.58203 17.2248L14.8129 5.24231L17.6211 8.05247L8.58203 17.2248Z' fill='#161616'></path>
                    <path fillRule='evenodd' clipRule='evenodd'
                      d='M8.25781 17.6914L25.1339 0.3125H33.9991V7.62657C33.9991 7.62657 33.8144 10.0645 32.5743 11.3686L21.0179 23.6875H14.5487L8.25781 17.6914Z'
                      fill='currentColor'></path>
                  </svg>
                </div>
                <h6 className='color-78'>Company Name</h6>
              </div>
              <p className='mb-0 color-68'> Office 149, 450 South Brand Brooklyn </p>
              <p className='my-2 color-68'> San Diego County, CA 91905, USA </p>
              <p className='mb-0 color-68'> +1 (123) 456 7891, +44 (876) 543 2198 </p>
            </div>
            <div className='m-3'>
              <h6 className='d-flex align-items-center'>
                <span
                  style={{ marginInlineEnd: '12px', inlineSize: '6rem', fontWeight: '500', fontSize: '1.375rem', color: 'rgba(47,43,61,.78)' }}>
                  Invoice
                </span>
                <span style={{ inlineSize: '9.5rem', height: '40px' }}>
                  <input type='text' placeholder='#5086' disabled
                    style={{ height: '40px', borderRadius: '6px', inlineSize: '9.5rem', padding: '6px' }} />
                </span>
              </h6>
              <p className='d-flex align-items-center'>
                <span
                  style={{ marginInlineEnd: '12px', inlineSize: '6rem', fontWeight: '400', fontSize: '.9375rem', color: 'rgba(47,43,61,.68)' }}>
                  Date Issued
                </span>
                <span>
                  <input name='issueDate' type='date' placeholder='#5086'
                    style={{ height: '40px', borderRadius: '6px', inlineSize: '9.5rem', padding: '6px' }}
                    value={issueDate} onChange={handleInputChange} />
                </span>
              </p>
              <p className='d-flex align-items-center'>
                <span
                  style={{ marginInlineEnd: '12px', inlineSize: '6rem', fontWeight: '400', fontSize: '.9375rem', color: 'rgba(47,43,61,.68)' }}>
                  Due Date
                </span>
                <span>
                  <input name='dueDate' type='date' placeholder='#5086'
                    style={{ height: '40px', borderRadius: '6px', inlineSize: '9.5rem', padding: '6px' }}
                    value={dueDate} onChange={handleInputChange} />
                </span>
              </p>
            </div>
          </div>
          <hr style={{ height: '0' }} />
          <div className='d-flex flex-wrap justify-content-between gap-y-5 p-24'>
            <div className='m-3' style={{ inlineSize: '15.5rem' }}>
              <h6 className='color-78 mb-4'> Invoice To: </h6>
              <div className='mb-4'>
                <FormControl fullWidth>
                  <InputLabel name='user' id='demo-simple-select-label'>
                    Name
                  </InputLabel>
                  <Select labelId='demo-simple-select-label' id='demo-simple-select' name='user' value={user}
                    onChange={handleSelectChange} classsName>
                      {allUsers?.map((users) => {
                        return <MenuItem key={users._id} value={users.name}>{users.name}
                            </MenuItem>
                            
                      })}
                      {/* <MenuItem value={'Tony'}>Tony</MenuItem>
                    <MenuItem value={'Kevin'}>Kevin</MenuItem> */}
                    {/* <MenuItem value={'Tony'}>Tony</MenuItem>
                    <MenuItem value={'Kevin'}>Kevin</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className='m-3'>
              <h6 className='color-78 mb-3'> Bill To: </h6>
              <table>
                <tbody>
                  <tr>
                    <td class='pe-6 pb-1 ps-0 color-68'> Total Due: </td>
                    <td class='font-weight-medium pb-1 color-68'>PKR 12,110.55</td>
                  </tr>
                  <tr>
                    <td class='pe-6 pb-1 ps-0 color-68'> Bank Name: </td>
                    <td class='pb-1 color-68'>American Bank</td>
                  </tr>
                  <tr>
                    <td class='pe-6 pb-1 ps-0 color-68'> Country: </td>
                    <td class='pb-1 color-68'>United States</td>
                  </tr>
                  <tr>
                    <td class='pe-6 pb-1 ps-0 color-68'> IBAN: </td>
                    <td class='pb-1 color-68'>ETD95476213874685</td>
                  </tr>
                  <tr>
                    <td class='pe-6 pb-1 ps-0 color-68'> SWIFT Code: </td>
                    <td class='pb-1 color-68'>BR91905</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr style={{height:"0"}} />
          <div className='p-24'>
            <div className='m-2'>
              <div className='mb-3 responsive-nav-items'>
                <div className='row'>
                  <div className='col-md-6 col-12'>
                    <span class="color-68"> Item </span>
                  </div>
                  <div className='col-md-2 col-12'>
                    <span class="color-68"> Cost </span>
                  </div>
                  <div className='col-md-2 col-12'>
                    <span class="color-68"> Qty </span>
                  </div>
                  <div className='col-md-2 col-12'>
                    <span class="color-68"> Price </span>
                  </div>
                </div>
              </div>
              <div className='card' style={{ boxShadow: "none" }}>
                <div className='p-20'>
                  <div className='row'>
                    <div className='col-md-6 col-12'>
                      <div className="mb-3 flex-grow-1">
                        <label class="mb-1" style={{ fontSize: ".8125rem" }}>Select Item</label>
                        <FormControl fullWidth>
                          <Select labelId='demo-simple-select-label' id='demo-simple-select' name='item' value={item}
                    onChange={handleSelectChange} classsName>
                      {products?.map((product) => {
                        return <MenuItem key={product._id} value={product.name}>{product.name}
                            </MenuItem>
                            
                      })}
                      {/* <MenuItem value={'Tony'}>Tony</MenuItem>
                    <MenuItem value={'Kevin'}>Kevin</MenuItem> */}
                    {/* <MenuItem value={'Tony'}>Tony</MenuItem>
                    <MenuItem value={'Kevin'}>Kevin</MenuItem> */}
                  </Select>
                        </FormControl>
                      </div>

                      <div className="mb-3 flex-grow-1">
                        <label class="mb-1" style={{ fontSize: ".8125rem" }}>Description</label>
                        <div>
                          <input name='description' type='text' 
                    style={{ height: '40px', borderRadius: '6px', inlineSize: '9.5rem', padding: '6px' }}
                    value={description} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4 col-md-2 col-12">
                      <div>
                        <label class="mb-2" style={{ fontSize: ".8125rem" }}>Cost</label>
                        <div>
                          <input name="cost" value={cost} onChange={handleInputChange} type="number"
                            id="cost"
                            style={{borderRadius:'6px',width:"99px", height:"40px",padding:"12px",outline:"none",border:"1px solid rgba(47,43,61,.68)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4 col-md-2 col-12">
                      <div>
                        <label class="mb-2" style={{ fontSize: ".8125rem" }}>Qty</label>
                        <div>
                          <input name="quantity" value={quantity} onChange={handleInputChange} type="number"
                            id="quantity"
                            style={{borderRadius:'6px',width:"99px", height:"40px",padding:"12px",outline:"none",border:"1px solid rgba(47,43,61,.68)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4 col-md-2 col-12">
                      <p className="my-2">
                        <span className="color-68">PKR 50</span>
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="m-3">
              <button type="button" className='create-invoice-btn' style={{outline:"none",border:'none'}}>
                <span>Add Item</span>
              </button>
            </div>
          </div>
          <hr style={{height:'0'}} />
          <div className='d-flex flex-wrap justify-content-between gap-y-5 p-24'>
            <div className="m-2">
              <div className="d-flex align-items-center mb-3">
                <h6 class="color-78 me-3" style={{ fontSize: ".9125rem" }}> Salesperson: </h6>
                <input value={salesPerson} onChange={handleInputChange} name="salesPerson" type="text"
                  className="px-2" placeholder="John"
                  style={{borderRadius:'6px',border:"1px solid rgba(47,43,61,.78)",padding:'5px',width:"100%"}} />
              </div>
              <div>
                <input value={message} onChange={handleInputChange} name="message" type="text"
                  placeholder="Message"
                  style={{borderRadius:'6px',border:"1px solid rgba(47,43,61,.78)",padding:'5px',width:"100%"}} />
              </div>
            </div>
            <div className="m-2">
              <table>
                <tr>
                  <td class="text-end">
                    <div class="me-2">
                      <p class="mb-2 color-68"> Subtotal: </p>
                      <p class="mb-2 color-68"> Discount: </p>
                      <p class="mb-2 color-68"> Tax: </p>
                      <p class="mb-2 color-68"> Total: </p>
                    </div>
                  </td>
                  <td class="font-weight-medium text-high-emphasis">
                    <p class="mb-2 color-78"> PKR 154.25 </p>
                    <p class="mb-2 color-78"> PKR 00.00 </p>
                    <p class="mb-2 color-78"> PKR 50.00 </p>
                    <p class="mb-2 color-78"> PKR 204.25 </p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <hr style={{height:'0'}} />
          <div className='p-24 mx-1'>
            <p class="mb-2 color-78" style={{fontSize:".8125rem",fontWeight:"500"}}> Note: </p>
            <div>
              <input name='note' type='text'
                    style={{ height: '40px', borderRadius: '6px', inlineSize: '9.5rem', padding: '6px' }}
                    value={note} onChange={handleInputChange} />
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-3 col-12 mb-4'>
        <div className='card'>
          <div className='p-24'>
            <span type='button' onClick={handleSubmit} className='invoice-btn primary--btn'>
              <span className='me-2 send '>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em"
                  viewBox="0 0 24 24">
                  <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3">
                  </path>
                </svg>
              </span>
              <span  className='text-white'>Send Invoice</span>
            </span>

            <button type='button' className='invoice-btn gray--btn'>
              <span className='color-78'>Preview</span>
            </button>

            <button type='button' className='invoice-btn gray--btn'>
              <span className='color-78'>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
}

export default MainInvoice