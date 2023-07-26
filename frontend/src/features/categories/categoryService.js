import axios from 'axios';
const URL = `${process.env.REACT_APP_BASE_URL}/category`;

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
    const response = await axios.get(`${URL}/get-user/${id}`,config)
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
    getSingleCategory
}


export default categoryService;