const AsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AuthMiddleware = AsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            token = token.replaceAll(/"/g, '');
            decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id)
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized');
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized,No Token Found')
    }
})

module.exports = {
    AuthMiddleware
}