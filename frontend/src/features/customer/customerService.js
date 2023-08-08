import axios from 'axios';
const URL = `${process.env.REACT_APP_BASE_URL}/api/customer`;
// const URL = `http://localhost:3001/api/customer`;
const postCustomer = async (customer,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(`${URL}/add-customer`, customer,config);
    return response.data;
}

const getAllCustomers = async(token)=>{
    const config = {
        headers:{
            Authorization :`Bearer ${token}`
        }
    }
    const response = await axios.get(`${URL}/get-customers`);
    return response.data;
}

// fetch single customer for update
const getSingleCustomer = async (id,token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(`${URL}/get-customer/${id}`,config)
    return response.data;
}

const updateCustomer = async(userData,token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(`${URL}/update-customer/${userData._id}`,userData,config)
    return response.data;
}

const removeCustomer = (token,id) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    let response = axios.delete(`${URL}/remove-customer/${id}`,config);
    return response.data;
}


const customerService = {
    getAllCustomers,
    postCustomer,
    removeCustomer,
    getSingleCustomer,
    updateCustomer
}


export default customerService;