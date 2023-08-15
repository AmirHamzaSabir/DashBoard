import authReducer from '../features/auth/authSlice'
import categoryReducer from '../features/categories/categorySlice'
import productReducer from '../features/products/productSlice'
import orderReducer from '../features/order/orderSlice'
import shippingReducer from '../features/shipping/shippingSlice'
import invoiceReducer from '../features/invoice/invoiceSlice'
import customerReducer from '../features/customer/customerSlice'
import refundReducer from '../features/refund/refundSlice'

import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import { initialUser } from '../features/Forms/Form'

// const formReducer = createForms({
//     userForm: initialUser,
//   });
  
  export const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    shipping: shippingReducer,
    invoice: invoiceReducer,
    customers:customerReducer,
    refund:refundReducer,
    form:formReducer
  });
  