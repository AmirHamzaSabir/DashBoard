const express = require('express');
const {
    errorHandler
} = require('./middlewares/errorMiddleware');
const connectDB = require('./config/connect.js')
require('dotenv').config();
require('colors');
const cors = require('cors')
const port = process.env.PORT;
const app = express();
const path = require('path');
// allow cross site requests
app.use(cors());

// connect to the database
connectDB()

// get the data from the body
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
// handle user routes
app.use('/api/users', require('./routes/userRoutes'))
// handle reset password
app.use('/api/users/reset-password', require('./routes/resetPasswordRoute'))
// handle the visitor routes
app.use('/api/visitors/', require('./routes/visitorRoutes'))
// handle the category routes
app.use('/api/category/', require('./routes/categoryRoutes'))
// handle the product routes
app.use('/api/product/', require('./routes/productRoutes'))
// handle the order routes
app.use('/api/order/', require('./routes/orderRoutes'))
// handle the payment 
app.use('/api/payments/', require('./routes/paymentRoutes'));
// handle the payment 
app.use('/api/shipping/', require('./routes/shippingRoutes'));
// handle the payment 
app.use('/api/invoice/', require('./routes/invoiceRoutes'));
// check for errors
app.use(errorHandler)




app.listen(port, () => console.log(`server started on port:${port}`))