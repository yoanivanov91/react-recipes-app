const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { generateToken } = require("../util/token");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (email == '' || password == '' || firstName == '' || lastName == '') {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email }).collation({locale: "en", strength: 2});

  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).collation({locale: "en", strength: 2}).select('+password');

  if (user && (await bcrypt.compare(password, user.password))) {

    res.json({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findOne({_id: req.user._id}).collation({locale: "en", strength: 2})
  res.status(200).json(user);
});



module.exports = {
  registerUser,
  loginUser,
  getMe
};
