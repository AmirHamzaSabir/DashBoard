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

const getCategories = AsyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        categories
    });
})
const getCategoryById = AsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
})
const updateCategory = AsyncHandler(async (req, res) => {
    const user = req.user;
    var response = null;
   if(user.role === 2){
      const data = await Category.findById(req.params.id);
      if (data) {
        const id = data.id;
        const categoryname = req.body.category || data.category;
        response = await Category.deleteOne({ _id: id });
        if (response.acknowledged) {
          response = await Category.create({
            category:categoryname
          });
          
        }
        res.status(200).json(response);
      }
      res.status(404);
      throw new Error("Not Found");
    
   }
   else{
      res.status(401);
      throw new Error("You are not authorized");
   }
  });
  const removeCategory = AsyncHandler(async(req,res) =>{
    const id = req.params.id;
    const category = await Category.deleteOne({ _id: id });
    res.status(200).json(category);
})

module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    removeCategory
}