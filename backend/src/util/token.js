const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    const payload = {
        id
    }
    const options = {
        expiresIn: "1d",
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken
}