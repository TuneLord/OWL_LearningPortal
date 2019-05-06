const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. Token not provided.')

    try {
        req.user = jwt.verify(token, config.owlJwtKey);
        next();
    } catch(ex) {
        res.status(400).send('Invalid token.')
    }
    
}

module.exports = auth;