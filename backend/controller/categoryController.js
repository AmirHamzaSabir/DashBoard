const AsyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

const addCategory = AsyncHandler(async (req, res) => {
    // get the category from the body
    const { category } = req.body;
    const check = await Category.findOne({ category:category });
    if (!check) {
        if (req.user.role === 1 || req.user.role === 2) {
            const newCategory = await Category.create({
                category,
            })
            res.json({
                newCategory
            })
        }
    }else{
        res.status(400);
        throw new Error('Category already Present')
    }
    
});

const getCategory = AsyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        categories
    });
})

module.exports = {
    addCategory,
    getCategory
}