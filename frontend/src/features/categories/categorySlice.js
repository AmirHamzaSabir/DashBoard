import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

// set the initialState
const initialState = {
    categories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const addCategory = createAsyncThunk('category/post', async (category, thunkApi) => {
    try {
        
    let token = thunkApi.getState().auth.user.token;
    return categoryService.postCategory(category, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const getCategory = createAsyncThunk('category/get', async (category, thunkApi) => {
    try {
        
    return categoryService.getCategory();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const categorySlice = createSlice({
    name: 'category',
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
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.categories = null
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories.categories.push(action.payload);
            })
            .addCase(getCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategory.rejected, (state, action) => {
                
                state.isLoading = false;
                state.isError = true;
                state.categories = null
                state.message = action.payload;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
    }
})
export const { reset } = categorySlice.actions;
export default categorySlice.reducer