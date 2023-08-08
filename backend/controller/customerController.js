const AsyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
const bcrypt = require("bcrypt");

const getAllCustomers = AsyncHandler(async (req, res) => {
  const customers = await Customer.find();
  console.log(customers);
  res.status(200).json({ customers });
});

const postCustomer = AsyncHandler(async (req, res) => {
  try {
    const { name, email, password, address, contactNumber } = req.body;
    if (name && email && password && address && contactNumber) {
      const customer = await Customer.findOne({ email });
      console.log(customer);
      if (customer === null) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        const customer = await Customer.create({
          ...req.body,
          password: hashedPassword,
        });
        res.status(200).json({ customer });
      } else {
        console.log(customer);
        res.status(400);
        throw new Error("Customer already exists with this email");
      }
    } else {
      res.status(400);
      throw new Error("Please enter all fields");
    }
  } catch (err) {
    res.status(403);
    throw new Error("Error while creating customer");
  }
});

const getSingleCustomer = AsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.status(200).json({customer});
})

const updateCustomer = AsyncHandler(async(req,res)=>{
  const user = req.user;
  var response = null;
if(user.role === 2 || user.role === 1){
  const data = await Customer.findById(req.params.id);
  if (data) {
    response = await await Customer.findOneAndUpdate(
      { _id: `${req.params.id}` },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(response);
  }else{
      res.status(404);
      throw new Error("Not Found");
    }
}
else{
  res.status(401);
  throw new Error("You are not authorized");
}
})

module.exports = {
  getAllCustomers,
  postCustomer,
  getSingleCustomer,
  updateCustomer
};
