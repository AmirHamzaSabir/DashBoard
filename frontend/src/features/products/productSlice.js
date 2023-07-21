import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
const initialState = {
    products: [],
    p_isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};


export const addProduct = createAsyncThunk('product/add', async (productData,thunkApi) => {
    try {
        return await productService.addProduct(productData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const getProducts = createAsyncThunk('product/get', async (_,thunkApi) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.p_isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.p_isLoading = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.products = null
                state.p_isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.p_isLoading = false;
                state.isSuccess = true;
                state.products.push(action.payload);
            })
            .addCase(getProducts.pending, (state) => {
                state.p_isLoading = true;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = null
                state.p_isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.p_isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
    }
})
export const { reset } = productSlice.actions;

export default productSlice.reducer;