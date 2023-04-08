const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { verifyToken } = require('../util/token');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = verifyToken(token);

      req.user = await User.findById(decoded.id);

      next();
    } catch (err) {
      res.status(401);
      throw new Error('Unauthorized request');
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token');
  }
})

const getUser = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = verifyToken(token);

      req.user = await User.findById(decoded.id);

    } catch (err) {
      req.user = null;
    }
  }

  if (!token) {
    req.user = null;
  }
  next();
})

module.exports = { protect, getUser }