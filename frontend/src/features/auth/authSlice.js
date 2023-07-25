import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import authService from './authService';


const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    u_isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    allUsers: [],
}
// handle the registration

export const registerUser = createAsyncThunk('auth/registerUser', async (user, thunkApi) => {
    try {
        return await authService.registerUser(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})


// handle the login

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkApi) => {
    try {
        return authService.loginUser(userData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})



// handle the reset password

export const sendResetMail = createAsyncThunk('auth/reset-mail', async (userData, thunkApi) => {
    try {
        return authService.sendResetMail(userData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})

// handle the reset passsword

export const resetPassword = createAsyncThunk('auth/reset-pass', async (token, data, thunkApi) => {
    try {
        return authService.resetPassword(token, data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
})



// add new user
export const addNewUser = createAsyncThunk('auth/add-new-user', async (userData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return authService.addNewUser(userData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});
// update user
export const updateUser = createAsyncThunk('auth/update-user', async (userData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return authService.updateUser(userData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

export const getAllUsers = createAsyncThunk('auth/get-all-user', async (_, thunkApi) => {
    try {
        return authService.getAllUsers();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});
//single user api
export const getSingleUser = createAsyncThunk('auth/get-single-user', async (id, thunkApi) => {
    try {
        return authService.getSingleUser(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});
//remove user api
export const removeUser = createAsyncThunk('auth/remove-single-user', async (id, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return authService.removeUser(token,id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
    try {
        return authService.logout();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.u_isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.u_isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.u_isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(logout.rejected, (state) => {
                state.u_isLoading = false;
                state.isSuccess = false;
                state.isError = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.u_isLoading = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null
                state.u_isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.u_isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(sendResetMail.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(sendResetMail.rejected, (state, action) => {
                state.u_isLoading = false;
                state.isError = true;
                state.message = 'Invalid email address'
            })
            .addCase(sendResetMail.fulfilled, (state) => {
                state.u_isLoading = false;
                state.isSuccess = true;
            })
            .addCase(resetPassword.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.u_isLoading = false;
                state.isError = true;
                state.message = 'An Error Occured'
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.u_isLoading = false;
                state.isSuccess = true;
            })
            .addCase(removeUser.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.u_isLoading = false;
                state.isError = true;
                state.message = 'An Error Occured'
            })
            .addCase(removeUser.fulfilled, (state,action) => {
                state.u_isLoading = false;
                state.isSuccess = true;
                state.message = 'Deleted Successfully';
                //  // Find the index of the deleted record
                const deletedRecordIndex = state.allUsers.findIndex(
                    (user) => user._id === action.meta.arg
                );
  
                // // If the deleted record is found in the allUsers array, remove it
                if (deletedRecordIndex !== -1) {
                    state.allUsers.splice(deletedRecordIndex, 1);
                }
            })
            .addCase(addNewUser.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.u_isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.u_isLoading = false;
                state.isSuccess = true;
                state.allUsers.push(action.payload);
            })
            .addCase(updateUser.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.u_isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.u_isLoading = false;
                state.isSuccess = true;
                state.message = "Updated Successfully";
                // Find the index of the updated record
                  const updatedRecordIndex = state.allUsers.findIndex(
                    (user) => user._id === action.meta.arg.id
                );
                console.log(updatedRecordIndex)
                // If the updated record is found in the allUsers array, update it
                if (updatedRecordIndex !== -1) {
                    state.allUsers.forEach(user =>{
                        if(user._id === action.meta.arg.id){

                            console.log(user)
                        }
                    })
                    state.allUsers[updatedRecordIndex] = action.payload;
                    state.allUsers.forEach(user =>{
                        console.log(user)
                    })

                }
                        
            })
            .addCase(getAllUsers.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.u_isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.u_isLoading = false;
                state.isSuccess = true;
                state.allUsers = action.payload;
            })
            .addCase(getSingleUser.pending, (state) => {
                state.u_isLoading = true;
            })
            .addCase(getSingleUser.rejected, (state, action) => {
                state.u_isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.u_isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
    }
})

export const {
    reset
} = authSlice.actions
export default authSlice.reducer