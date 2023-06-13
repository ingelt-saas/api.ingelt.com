const inGeltUtil = require('../../utils/ingelt');
const inGeltService = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// authentication
inGeltService.authentication = async (req, res) => {
    try {
        const getAdmin = await inGeltUtil.readByEmail(req.body.email);
        if (getAdmin) {
            if (await bcrypt.compare(req.body.password, getAdmin.password)) {
                const token = await jwt.sign(getAdmin, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.status(200).json({ token: token });
            } else {
                return res.status(401).json({ message: 'Incorrect Password' });
            }
        } else {
            return res.status(404).send({ message: 'Admin Not Found' });
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

// read by id
inGeltService.getInGeltAdmin = async (req, res) => {
    try {
        const result = await inGeltUtil.readById(req.decoded.id);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = inGeltService;