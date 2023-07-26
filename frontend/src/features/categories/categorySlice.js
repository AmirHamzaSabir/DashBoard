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
//get single category by id
export const getSingleCategory = createAsyncThunk('auth/get-single-category', async (id, thunkApi) => {
    try {
        return categoryService.getSingleCategory(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});
//remove category api
export const removeCategory = createAsyncThunk('category/remove-single-category', async (id, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return categoryService.removeCategory(token,id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

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
            .addCase(getSingleCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleCategory.rejected, (state, action) => {
                
                state.isLoading = false;
                state.isError = true;
                state.categories = null
                state.message = action.payload;
            })
            .addCase(getSingleCategory.fulfilled, (state, action) => {
                state.message = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(removeCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.categories = null
                state.message = action.payload;
            })
            .addCase(removeCategory.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                //  // Find the index of the deleted record
                const deletedRecordIndex = state.categories.categories.findIndex(
                    (user) => user._id === action.meta.arg
                );
  
                // // If the deleted record is found in the allUsers array, remove it
                if (deletedRecordIndex !== -1) {
                    state.categories.categories.splice(deletedRecordIndex, 1);
                }
            })
    }
})
export const { reset } = categorySlice.actions;
export default categorySlice.reducer