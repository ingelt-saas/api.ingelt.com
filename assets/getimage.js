const getFile = require("../aws/file");

module.exports = async (req, res) => {
    const key = req.headers.imagekey;
    try {
        const url = await getFile(key);
        res.send(url);
    } catch (err) {
        res.status(400).send(err);
    }
}