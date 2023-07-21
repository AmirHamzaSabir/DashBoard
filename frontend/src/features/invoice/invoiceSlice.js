import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invoiceService from './invoiceService';

// set the initialState
const initialState = {
    invoice: [],
    i_isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const postInvoice = createAsyncThunk('invoice/post', async (invoice, thunkApi) => {
    try {
        
    return invoiceService.postInvoice(invoice);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})
export const getInvoice = createAsyncThunk('invoice/get', async (thunkApi) => {
    try {
        
    return invoiceService.getInvoice();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})



export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        reset: (state) => {
            state.i_isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postInvoice.pending, (state) => {
                state.i_isLoading = true;
            })
            .addCase(postInvoice.rejected, (state, action) => {
                state.invoice = null
                state.i_isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(postInvoice.fulfilled, (state, action) => {
                state.i_isLoading = false;
                state.isSuccess = true;
                state.invoice.push(action.payload);
            })
            .addCase(getInvoice.pending, (state) => {
                state.i_isLoading = true;
            })
            .addCase(getInvoice.rejected, (state, action) => {
                state.invoice = null
                state.i_isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getInvoice.fulfilled, (state, action) => {
                state.i_isLoading = false;
                state.isSuccess = true;
                state.invoice = action.payload;
            })
            
    }
})

export const {reset} = invoiceSlice.actions
export default invoiceSlice.reducer;

