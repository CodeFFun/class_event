const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return  bcrypt.hashSync(password, salt);
}

const comparePassword = (password, hashedPassword) => {
    return  bcrypt.compareSync(password, hashedPassword);
}

module.exports = {hashPassword, comparePassword};