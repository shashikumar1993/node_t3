const agron2 = require('argon2');

const hashPassword = (password) => {
    return agron2.hash(password);
}

const verifyPassword = (hashPassword,password) => {
    return agron2.verify(hashPassword,password);
}

module.exports = {
    hashPassword,
    verifyPassword   
}