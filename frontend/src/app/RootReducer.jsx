import authReducer from '../features/auth/authSlice'
import categoryReducer from '../features/categories/categorySlice'
import productReducer from '../features/products/productSlice'
import orderReducer from '../features/order/orderSlice'
import shippingReducer from '../features/shipping/shippingSlice'
import invoiceReducer from '../features/invoice/invoiceSlice'
import { combineReducers } from '@reduxjs/toolkit';
import { createForms } from 'react-redux-form';
import { initialCategory } from '../features/Forms/Form'

const formReducer = createForms({
    categoryForm: initialCategory,
  });
  
  export const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    shipping: shippingReducer,
    invoice: invoiceReducer,
    ...formReducer, // Include the formReducer
  });
  