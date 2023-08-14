const moduleCouponUtil = require('../../utils/moduleCoupon');

const moduleCouponService = require('express').Router();

// create
moduleCouponService.post('/', async (req, res) => {
    try {
        const result = await moduleCouponUtil.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all module coupon
moduleCouponService.get('/getall', async (req, res) => {
    try {
        const result = await moduleCouponUtil.getAll();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update coupon
moduleCouponService.put('/:couponId', async (req, res) => {
    try {
        const result = await moduleCouponUtil.update(req.params.couponId, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete
moduleCouponService.delete('/:couponId', async (req, res) => {
    try {
        await moduleCouponUtil.delete(req.params.couponId);
        res.sendStatus(202);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = moduleCouponService;