import React,{useEffect} from 'react'
import ContentSpinner from '../../../../Spinner/ContentSpinner';
import { getSales } from '../../../../../features/order/orderSlice';

import { useDispatch, useSelector } from 'react-redux';
const Saleoverview = () => {
    const dispatch = useDispatch();
    const { sales,isError,isLoading } = useSelector(state => state.order);
    useEffect(() => {
        if (isError) {
            alert("An Error Occured");
        }else{
            dispatch(getSales())
        }
    },[])
    if(isLoading){
        return <ContentSpinner/>
    }
    return (
        <div className='col-sm-12 col-md-6 col-lg-6 mb-4'>
            <div className='card h-100'>
                <div className='pad'>
                    <div class="d-flex align-items-center justify-content-between">
                        <span class="text-sm text-disabled">Sales Overview</span>
                        <span class="text-success">+18.2%</span>
                    </div>
                    <h4 class="text-h4"> PKR {sales/1000}k </h4>
                </div>
                <div className='pad' style={{ paddingTop: '0' }}>
                    <div className='row'>
                        <div className='col-5' style={{ paddingLeft: '0' }}>
                            <div className='d-flex align-items-center mbtm-3'>
                                <div className='icons-cart cart-color'>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"></path><path d="M17 17H6V3H4"></path><path d="m6 5l14 1l-1 7H6"></path></g></svg>
                                </div>
                                <span>Order</span>
                            </div>
                            <h5 class="text-h5 ml"> 62.2% </h5>
                            <span class="text-sm text-disabled ml">6,440</span>
                        </div>

                        <div className='col-2'>
                            <div className='d-flex flex-column align-items-center justify-content-center h-100'>
                                <hr className="custom--hr" aria-orientation="vertical" role="separator" />
                                <div>
                                    <span>VS</span>
                                </div>
                                <hr className="custom--hr" aria-orientation="vertical" role="separator" />
                            </div>
                        </div>

                        <div className='col-5 text-end'>
                            <div className='d-flex align-items-center justify-content-end mbtm-3'>
                                <span>Visits</span>
                                <div className='icons-cart share-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.068 5.068 0 0 1-7.127 0a4.972 4.972 0 0 1 0-7.071L6 11"></path></svg>
                                </div>
                            </div>
                            <h5 class="text-h5"> 25.5% </h5>
                            <span class="text-sm text-disabled">12,749</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Saleoverview
