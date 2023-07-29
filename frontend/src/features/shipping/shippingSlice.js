import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { shippingService } from "./shippingService";
const initialState = {
    shipping: [],
    s_isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};


export const addShipping = createAsyncThunk('product/add', async (shippingData,thunkApi) => {
    try {
        return await shippingService.addShipping(shippingData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})


export const shippingSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.s_isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addShipping.pending, (state) => {
                state.s_isLoading = true;
            })
            .addCase(addShipping.rejected, (state, action) => {
                state.s_isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addShipping.fulfilled, (state, action) => {
                state.s_isLoading = false;
                state.isSuccess = true;
                state.shipping.push(action.payload);
            })
            
    }
})
export const { reset } = shippingSlice.actions;

export default shippingSlice.reducer;