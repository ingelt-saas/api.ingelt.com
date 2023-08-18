const couponUtil = require('../../utils/coupon');

const couponService = require('express').Router();

// create
couponService.post('/', async (req, res) => {
    try {
        const result = await couponUtil.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all module coupon
couponService.get('/getall', async (req, res) => {
    try {
        const { couponFor } = req.query;
        const result = await couponUtil.getAll(couponFor);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update coupon
couponService.put('/:couponId', async (req, res) => {
    try {
        const result = await couponUtil.update(req.params.couponId, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete
couponService.delete('/:couponId', async (req, res) => {
    try {
        await couponUtil.delete(req.params.couponId);
        res.sendStatus(202);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = couponService;