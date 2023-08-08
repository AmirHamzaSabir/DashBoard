import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from './customerService';

// set the initialState
const initialState = {
    customers: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    response:''
}

export const addCustomer = createAsyncThunk('customer/post', async (customer, thunkApi) => {
    try {
        
    let token = thunkApi.getState().auth.user.token;
    return customerService.postCustomer(customer, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

export const getAllCustomers = createAsyncThunk('customer/get', async (customer, thunkApi) => {
    try {
        
    return customerService.getAllCustomers();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})
//get single customer by id
export const getSingleCustomer = createAsyncThunk('auth/get-single-customer', async (id, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return customerService.getSingleCustomer(id,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

// update user
export const updateCustomer = createAsyncThunk('customer/update', async (userData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        console.log(userData)
        return customerService.updateCustomer(userData, token);
    } catch (error) {
        return thunkApi.rejectWithValue(error.error);
    }
});

//remove customer api
export const removecustomer = createAsyncThunk('customer/remove-single-customer', async (id, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return customerService.removecustomer(token,id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(error)
        return thunkApi.rejectWithValue(message);
    }
});

export const customerSlice = createSlice({
    name: 'customer',
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
            .addCase(addCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.customers.push(action.payload.newcustomer);
            })
            .addCase(getAllCustomers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                console.log(action.payload)
                state.customers = [...action.payload.customers];
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getSingleCustomer.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(getSingleCustomer.rejected, (state, action) => {
                
                state.isLoading = false;
                state.isError = true;
                state.customers = [];
                state.message = action.payload;
            })
            .addCase(getSingleCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.response = action.payload
            })
            .addCase(updateCustomer.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                
                state.isLoading = false;
                state.isError = true;
                state.isSuccess =false;
                state.message = action.payload;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload)
                // Find the index of the updated record
                const updatedRecordIndex = state.customers.findIndex(
                    (customer) => customer._id === action.payload._id
                );
                console.log(action)
                // If the updated record is found in the customers array, update it
                if (updatedRecordIndex !== -1) {
                    state.customers.splice(updatedRecordIndex,1,action.payload);
                }
            })
            .addCase(removecustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removecustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.customer;
            })
            .addCase(removecustomer.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.payload = action.payload
                console.log(action)
                //  // Find the index of the deleted record
                const deletedRecordIndex = state.customers.findIndex(
                    (customer) => customer._id === action.meta.arg
                );
  
                // // If the deleted record is found in the allUsers array, remove it
                if (deletedRecordIndex !== -1) {
                    state.customers.splice(deletedRecordIndex, 1);
                }
            })
    }
})
export const { reset } = customerSlice.actions;
export default customerSlice.reducer