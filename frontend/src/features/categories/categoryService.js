import axios from 'axios';
const URL = `/category`;

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


const categoryService = {
    getCategory,
    postCategory
}


export default categoryService;