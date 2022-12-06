const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}

const verifyToken = async(token) => {
    try{
        return await jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return null
    }
}

module.exports = { createToken , verifyToken }