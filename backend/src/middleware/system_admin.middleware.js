
const jwt = require('jsonwebtoken');
const SystemAdmin = require('../models/system_admin.model');

const systemAdminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authtoken;
        if(!token) {
            throw new Error("Token is not present");
        }
        const decodedToken = await jwt.verify(token, "JWTSECRETKEY@4815");
        const { id } = decodedToken;
        const user = await SystemAdmin.findByPk(id);
        req.user = user;
        next();

    } catch (error) {
        res.status(400).send("ERROR"+error.message);
    }
}

module.exports = {
    systemAdminAuth
}
