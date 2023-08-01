import axios from 'axios';
const URL = `${process.env.REACT_APP_BASE_URL}/product`;

const addProduct = async (productData) => {
    const response = await axios.post(`${URL}/add-product`,productData);
    return response.data;
}

const getProducts = async () => {
    const response = await axios.get(`${URL}/get-products`);
    return response.data; 
}

// fetch single Product for update
const getSingleProduct = async (id,token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(`${URL}/get-product/${id}`,config)
    return response.data;
}

const updateProduct = async(userData,token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(`${URL}/update-product/${userData._id}`,userData,config)
    return response.data;
}

const removeProduct = (token,id) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    let response = axios.delete(`${URL}/remove-product/${id}`,config);
    return response.data;
}

export const productService = {
    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    removeProduct
}