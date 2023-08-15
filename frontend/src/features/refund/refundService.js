import axios from 'axios';
const URL = `${process.env.REACT_APP_BASE_URL}/api/refund`;

// const URL = `http://localhost:3001/api/order`;

const postRefund = async (refund) => {
    const response = await axios.post(`${URL}/add-refund`, refund);
    return response.data;
}

const getAllRefund = async () => {
    const response = await axios.get(`${URL}/get-refunds`);
    return response.data;
}



const refundService = {
    postRefund,
    getAllRefund,

}


export default refundService