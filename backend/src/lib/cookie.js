const jwt = require('jsonwebtoken');

const generateCookie = async (user, res) => {
    const token = await jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 30
    });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    });
}

module.exports = {
    generateCookie
}
