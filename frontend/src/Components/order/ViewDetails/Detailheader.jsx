import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import { getSingleOrder,updateStatus,reset } from '../../../features/order/orderSlice';
import { getProducts } from '../../../features/products/productSlice';
import { getAllUsers } from '../../../features/auth/authSlice';

const Detailheader = () => {
    const [selectedStatus, setSelectedStatus] = useState('test');



    const { id } = useParams();
    const dispatch = useDispatch();
    const { orders, isLoading, isError, message,isSuccess } = useSelector((state) => state.order);
    const { products, p_isLoading } = useSelector((state) => state.product);
    const { allUsers, u_isLoading } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(isError){
            alert(message);
        }
        dispatch(reset());
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateStatus( id, {selectedStatus} ));
    };
    useEffect(() => {
        if (isError) {
        alert(message);
        }
        dispatch(getSingleOrder(id));
        dispatch(getProducts());
        dispatch(getAllUsers());
    }, [message, isError, dispatch, id]);

    const getProduct = (product_id) => {
        const myProduct = products.find((prod) => prod._id === product_id);
        return myProduct;
    };

    const getUser = (user_id) => {
        const user = allUsers.find((user) => user._id === user_id);
        return user;
    };

    if (isLoading || p_isLoading || u_isLoading) {
        return <Spinner />;
    }

    return (
        <div className="d-flex flex-wrap justify-content-between gap-y-5 p-24">
        <div>
            <h2 className="heading">{getProduct(orders.product)?.name || 'no data'}</h2>
            <p className="mr-05">{getUser(orders.user)?.name || 'not loaded yet'}</p>
            <p className="mr-05">{getUser(orders.user)?.name || 'not loaded yet'}</p>
            <p className="mr-05">{getUser(orders.user)?.email || 'not loaded yet'}</p>
            <p className="mr-05">{getUser(orders.user)?.m_number || 'not loaded yet'}</p>
        </div>
        <div>
            <div className="orderid--container" style={{ width: 'max-content' }}>
            <span style={{ fontWeight: '500' }}>Order id# {orders._id}</span>
            </div>
            <div>
            <label
                htmlFor="status"
                style={{
                marginTop: '1rem',
                fontSize: '.975rem',
                fontWeight: '500',
                marginBottom: '.5rem',
                }}
            >
                Order Status
            </label>
            <FormControl fullWidth>
                <Select
                name="status"
                id="status"
                style={{ marginBottom: '12px', padding: '0' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                >
                <MenuItem value={'new'}>New</MenuItem>
                <MenuItem value={'confirm'}>Confirmed</MenuItem>
                <MenuItem value={'pack'}>Packed</MenuItem>
                <MenuItem value={'ship'}>Shipped</MenuItem>
                <MenuItem value={'delieve'}>Delivered</MenuItem>
                <MenuItem value={'pending'}>Pending</MenuItem>
                <MenuItem value={'cancel'}>Cancelled</MenuItem>
                <MenuItem value={'fail'}>Failed</MenuItem>
                <MenuItem value={'return'}>Returned</MenuItem>
                </Select>
                <div className="col-12 mb-3 w-100">
                <button onClick={handleSubmit} type="submit" className="btn btn-dark w-100">
                    Update Status
                </button>
                </div>
            </FormControl>
            </div>
        </div>
        </div>
    );
    };

    export default Detailheader;
