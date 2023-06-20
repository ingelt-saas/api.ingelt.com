const ShortlistUniversityMail = require('../../mail/student.university.query');
const studentShortlistUtil = require('../../utils/studentShortlist');
const universityUtil = require('../../utils/university');
const universityService = require('express').Router();

// get all university
universityService.get('/getall', async (req, res) => {
    try {
        const { country, course, areaOfInterest, pageNo, limit } = req.query;
        const result = await universityUtil.universityWithShortlist(
            req.decoded.id,
            parseInt(pageNo),
            parseInt(limit),
            country,
            course,
            areaOfInterest
        );
        res.json(result);
    } catch (err) {
        // console.log(err)
        res.status(400).send(err);
    }
});

// send query
universityService.post('/sendQuery', async (req, res) => {
    try {
        const student = req.decoded;
        const result = await ShortlistUniversityMail(student);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// add shortlist
universityService.post('/shortlist/:universityId', async (req, res) => {
    try {
        const data = {
            universityId: req.params.universityId,
            studentId: req.decoded.id,
        };
        const result = await studentShortlistUtil.create(data);
        res.status(201).json(result);
    } catch (err) {
        throw err;
    }
});

// remove shortlist
universityService.delete('/shortlist/:universityId', async (req, res) => {
    try {
        const result = await studentShortlistUtil.delete(req.decoded.id, req.params.universityId);
        res.status(204).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = universityService;