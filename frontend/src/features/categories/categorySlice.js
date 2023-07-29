import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

// set the initialState
const initialState = {
    categories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    response:''
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
        const token = thunkApi.getState().auth.user.token;
        return categoryService.getSingleCategory(id,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

// update user
export const updateCategory = createAsyncThunk('category/update', async (userData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        console.log(userData)
        return categoryService.updateCategory(userData, token);
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
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories.push(action.payload);
            })
            .addCase(getCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategory.rejected, (state, action) => {
                
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categories = [...action.payload.categories];
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
                state.categories = [];
                state.message = action.payload;
            })
            .addCase(getSingleCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.response = action.payload
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                
                state.isLoading = false;
                state.isError = true;
                state.isSuccess =false;
                state.message = action.payload;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                // Find the index of the updated record
                const updatedRecordIndex = state.categories.findIndex(
                    (user) => category._id === action.meta.arg.id
                );
                console.log(action)
                // If the updated record is found in the categories array, update it
                if (updatedRecordIndex !== -1) {
                    state.categories[updatedRecordIndex] = action.payload;
                    state.categories.forEach(category =>{
                        console.log(category)
                    })

                }
            })
            .addCase(removeCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.category;
            })
            .addCase(removeCategory.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                //  // Find the index of the deleted record
                const deletedRecordIndex = state.categories.findIndex(
                    (user) => user._id === action.meta.arg
                );
  
                // // If the deleted record is found in the allUsers array, remove it
                if (deletedRecordIndex !== -1) {
                    state.categories.splice(deletedRecordIndex, 1);
                }
            })
    }
})
// export const { reset } = categorySlice.actions;
export default categorySlice.reducer