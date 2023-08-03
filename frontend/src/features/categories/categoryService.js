import axios from 'axios';
const URL = `${process.env.REACT_APP_BASE_URL}/api/category`;
// const URL = `http://localhost:3001/api/category`;
const postCategory = async (category,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(`${URL}/add-category`, category,config);
    return response.data;
}

const getCategory = async (token) => {
    const response = await axios.get(`${URL}/get-category`);
    return response.data;
}
// fetch single category for update
const getSingleCategory = async (id,token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(`${URL}/get-category/${id}`,config)
    return response.data;
}

const updateCategory = async(userData,token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(`${URL}/update-category/${userData._id}`,userData,config)
    return response.data;
}

const removeCategory = (token,id) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    let response = axios.delete(`${URL}/remove-category/${id}`,config);
    return response.data;
}


const categoryService = {
    getCategory,
    postCategory,
    removeCategory,
    getSingleCategory,
    updateCategory
}


export default categoryService;