import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

// set the initialState
const initialState = {
    orders: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    sales:''
}

export const postOrder = createAsyncThunk('order/post', async (order, thunkApi) => {
    try {
        
    return orderService.postOrder(order);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const getOrders = createAsyncThunk('order/get', async (_,thunkApi) => {
    try {
        return await orderService.getOrders();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})
export const getSales = createAsyncThunk('order/sales', async (_,thunkApi) => {
    try {
        return await orderService.getSales();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})
export const getSingleOrder = createAsyncThunk('order/get-single', async (order_id,thunkApi) => {
    try {
        return await orderService.getSingleOrder(order_id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})
export const updateStatus = createAsyncThunk('order/update-status', async (order_id,status,thunkApi) => {
    try {
        return await orderService.updateStatus(order_id,status);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const orderSlice = createSlice({
    name: 'order',
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
            .addCase(postOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.orders = null
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders.push(action.payload);
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.orders = null
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getSingleOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleOrder.rejected, (state, action) => {
                state.orders = null
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSingleOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(updateStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.orders = null
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
        .addCase(getSales.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSales.rejected, (state, action) => {
                state.orders = null
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sales = action.payload;
            })
    }
})

export const {reset} = orderSlice.actions
export default orderSlice.reducer;

