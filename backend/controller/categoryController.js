const AsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const addCategory = AsyncHandler(async (req, res) => {
  // get the category from the body
  const { category } = req.body;
  const check = await Category.findOne({ category: category });
  console.log(check);
  if (!check) {
    if (req.user.role === 1 || req.user.role === 2) {
      const newCategory = await Category.create({
        category,
      });
      res.status(200).json({
        newCategory,
      });
    }
  } else {
    res.status(400);
    throw new Error("Category already Exists");
  }
});

const getCategories = AsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    categories,
  });
});
const getCategoryById = AsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json(category);
});
const updateCategory = AsyncHandler(async (req, res) => {
  const user = req.user;
  var response = null;
  console.log(user);
  try {
    if (user.role === 2) {
      console.log(req.body);
      const data = await Category.findById(req.params.id);
      if (data) {
        response = await Category.findOneAndUpdate(
          { _id: `${req.params.id}` },
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(response);
      } else {
        res.status(404);
        throw new Error("Record Not Found");
      }
    } else {
      res.status(401);
      throw new Error("You are not authorized");
    }
  } catch (err) {
    res.status(403);
    throw new Error("Error Occured");
  }
});
const removeCategory = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    
    try {
      const deletedCategory = await Category.findOneAndDelete({ _id: id });
      
      if (!deletedCategory) {
        // If the category with the specified id does not exist, return a 404 response
        return res.status(404).json({ message: 'Category not found' });
      }
      
      res.status(200).json(deletedCategory);
    } catch (error) {
      // Handle any other errors that might occur during the operation
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  removeCategory,
};
