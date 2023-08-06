import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
const initialState = {
  products: [],
  p_isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addProduct = createAsyncThunk(
  "product/add",
  async (productData, thunkApi) => {
    try {
      return await productService.addProduct(productData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/get",
  async (_, thunkApi) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  "product/get-single",
  async (id, thunkApi) => {
    try {
      return productService.getSingleProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/update-single-product",
  async (data, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      console.log(data)
      return productService.updateProduct(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//remove category api
export const removeProduct = createAsyncThunk(
  "product/remove-single-product",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return productService.removeProduct(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.p_isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.p_isLoading = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
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
      .addCase(getSingleProduct.pending, (state) => {
        state.p_isLoading = true;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.p_isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.p_isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.p_isLoading = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.p_isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.p_isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // Find the index of the updated record
        const updatedRecordIndex = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        console.log(action);
        // If the updated record is found in the categories array, update it
        if (updatedRecordIndex !== -1) {
          state.products.splice(updatedRecordIndex,1,action.payload);
        }
      })
      .addCase(removeProduct.pending, (state) => {
        state.p_isLoading = true;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.p_isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.p_isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        //  // Find the index of the deleted record
        const deletedRecordIndex = state.products.findIndex(
            (product) => product._id === action.meta.arg
        );

        // // If the deleted record is found in the allUsers array, remove it
        if (deletedRecordIndex !== -1) {
            state.products.splice(deletedRecordIndex, 1);
        }
      })
  },
});
export const { reset } = productSlice.actions;

export default productSlice.reducer;
