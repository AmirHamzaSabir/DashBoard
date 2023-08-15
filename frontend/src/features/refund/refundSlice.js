import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import refundService from './refundService';


// set the initialState
const initialState = {
    refunds: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const addRefund = createAsyncThunk('refund/add', async (refund, thunkApi) => {
    try {
    console.log(refund)
    return refundService.postRefund(refund);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const getRefunds = createAsyncThunk('refund/get', async (_,thunkApi) => {
    try {
        return await refundService.getAllRefund();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const refundSlice = createSlice({
    name: 'refund',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addRefund.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRefund.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addRefund.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.refunds.push(action.payload);
            })
            .addCase(getRefunds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRefunds.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getRefunds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.refunds = action.payload;
            })
            
    }
})

export const {reset} = refundSlice.actions
export default refundSlice.reducer;

