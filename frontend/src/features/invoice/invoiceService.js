import axios from 'axios';
const URL = `${process.env.REACT_APP_BASE_URL}/api/invoice`;
// const URL = `http://localhost:3001/api/invoice`;

const postInvoice = async (invoice) => {
    const response = await axios.post(`${URL}/add-invoice`, invoice);
    return response.data;
}
const getInvoice = async () => {
    const response = await axios.get(`${URL}/get-invoice`);
    return response.data;
}






const invoiceService = {
    postInvoice,
    getInvoice
}


export default invoiceService