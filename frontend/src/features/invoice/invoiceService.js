import axios from 'axios';
const URL = `/invoice`;

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