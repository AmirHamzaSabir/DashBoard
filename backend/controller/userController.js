const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/userModel");
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    res.status(400);
    throw new Error("Plese enter all the fields");
  }
  // check if user already exists
  const checkUser = await User.findOne({
    email,
  });
  if (checkUser) {
    res.status(400);
    throw new Error("user already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const registerdUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(200).json({
    id: registerdUser._id,
    name: registerdUser.name,
    email: registerdUser.email,
    role: registerdUser.role,
    token: generateToken(registerdUser._id),
  });
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(400);
    throw new Error("Please fill out all the fields");
  }
  // find the user
  const checkUser = await User.findOne({
    email,
  });
  if (!checkUser) {
    res.status(404);
    throw new Error("No User Found");
  }
  if (email && (await bcrypt.compare(password, checkUser.password))) {
    res.status(200).json({
      id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
      token: generateToken(checkUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const getAdmins = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (user.role === 1) {
    const admins = await User.find();
    res.status(200).json({
      admins,
    });
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    jwtSecret,
    {
      expiresIn: "30d",
    }
  );
};

const addNewUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (user.role === 2) {
    const { name, email, password, m_number, role } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      m_number,
      role,
    });
    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      m_number: newUser.m_number,
      role: newUser.role,
    });
  } else {
    res.status(401);
    throw new Error("You are not authorized");
  }
});
const getUserById = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
})
const updateUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  var response = null;
 if(user.role === 2){
    const data = await User.findById(req.body.id);
    if (data) {
      const id = data.id;
      const name = req.body.name || data.name;
      const role = req.body.role ;
      const password = req.body.password || data.password;
      const m_number = req.body.m_number || data.m_number;
      const email = data.email;
      response = await User.deleteOne({ _id: id });
      if (response.acknowledged) {
        response = await User.create({
          name:name,
          email:email,
          password:password,
          m_number:m_number,
          role:role,
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
const removeUser = AsyncHandler(async(req,res) =>{
    const id = req.params.id;
    const deletedUser = await User.deleteOne({ _id: id });
    res.status(200).json(deletedUser);
})

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  getAdmins,
  addNewUser,
  updateUser,
  removeUser
};
