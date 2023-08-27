const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/userModel");
const { paginateArray } = require("../customFunctons/functions");
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
  console.log(req.body);
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
    const user = {
      id: checkUser._id,
      fullName: checkUser.name,
      username: checkUser.name,
      password: checkUser.password,
      avatar: "@src/assets/images/portrait/small/avatar-s-11.jpg",
      email: checkUser.email,
      role: "admin",
      ability: [
        {
          action: "manage",
          subject: "all",
        },
      ],
      extras: {
        eCommerceCartItemsCount: 5,
      },
    };
    const jwtConfig = {
      loginEndpoint: "http://localhost:3001/api/users/login",
      registerEndpoint: "/jwt/register",
      refreshEndpoint: "/jwt/refresh-token",
      logoutEndpoint: "/jwt/logout",

      // ** This will be prefixed in authorization header with token
      // ? e.g. Authorization: Bearer <token>
      tokenType: "Bearer",

      // ** Value of this property will be used as key to store JWT token in storage
      storageTokenKeyName: "accessToken",
      storageRefreshTokenKeyName: "refreshToken",
      secret: "dd5f3089-40c3-403d-af14-d0c228b05cb4",
      refreshTokenSecret: "7c4c1c50-3230-45bf-9eae-c9b2e401c767",
      expireTime: "10m",
      refreshTokenExpireTime: "10m",
    };

    const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expireTime,
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      jwtConfig.refreshTokenSecret,
      {
        expiresIn: jwtConfig.refreshTokenExpireTime,
      }
    );

    const userData = { ...user };

    delete userData.password;
    const response = {
      userData,
      accessToken,
      refreshToken,
    };
    res.status(200).json(response);
    // res.status(200).json({
    //   id: checkUser._id,
    //   name: checkUser.name,
    //   email: checkUser.email,
    //   role: checkUser.role,
    //   token: generateToken(checkUser._id),
    // });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)

const getUsersChunk = AsyncHandler(async (req, res) => {
  const users = await User.find();
  const {
    q = '',
    page = 1,
    role = null,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'name'
  } = req.body

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
  console.log(dataToFilter[0]);
  const filteredData = dataToFilter.filter(
    user => {
      console.log(user.role === role)
      return  (user.email.toLowerCase().includes(queryLowered) ||
      user.name.toLowerCase().includes(queryLowered) ) &&
    user.role === (role === 0 ? role : (role || user.role)) &&
    user.status === (status === false ? status :(status || user.status))
    }
     
  )
  // const filteredData = dataToFilter.filter(
  //   user =>
  //     (user.email.toLowerCase().includes(queryLowered) ||
  //       user.name.toLowerCase().includes(queryLowered) ) &&
  //     user.role === (role || user.role) &&
  //     user.status === (status || user.status)
  // )
  /* eslint-enable  */
  console.log(filteredData.length)
  console.log(role)
  
    const response = {
      total: filteredData.length,
      users: paginateArray(filteredData, perPage, page)
    }
  console.log(paginateArray(filteredData, perPage, page))

    res.status(200).json(response)
 
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
});
const updateUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  var response = null;
  if (user.role === 2) {
    const data = await User.findById(req.params.id);
    console.log(req.body);

    if (data) {
      response = await User.findOneAndUpdate(
        { _id: `${req.params.id}` },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(response);
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
  } else {
    res.status(401);
    throw new Error("You are not authorized");
  }
});
const removeUser = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const deletedUser = await User.deleteOne({ _id: id });
  res.status(200).json(deletedUser);
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUsersChunk,
  getUserById,
  getAdmins,
  addNewUser,
  updateUser,
  removeUser,
};
