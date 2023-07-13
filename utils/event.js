const { Op } = require("sequelize");
const { event, eventBooking } = require("../models");

const eventUtil = {};

// create
eventUtil.create = async (data) => {
    try {
        const result = await event.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// read
eventUtil.read = async (pageNo, limit, searchQuery) => {
    try {

        let findQuery = {};
        if (searchQuery) {
            findQuery = {
                where: {
                    name: { [Op.like]: `%${searchQuery}%` }
                }
            };
        }

        const result = await event.findAndCountAll({
            ...findQuery,
            order: [['createdAt', 'DESC']],
            offset: (pageNo - 1) * limit,
            limit: limit,
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// read upcoming event
eventUtil.upcomingEvent = async () => {
    try {
        const result = await event.findOne({
            where: {
                eventDate: { [Op.gte]: new Date() }
            },
            include: [{ model: eventBooking, required: false, attributes: ['studentId', 'eventId'] }],
            order: [['eventDate', 'ASC']]
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// book event
eventUtil.bookEvent = async (data) => {
    try {
        const result = await eventBooking.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// update
eventUtil.update = async (eventId, updateData) => {
    try {
        const result = await event.update(updateData, {
            where: {
                id: eventId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// delete 
eventUtil.delete = async (eventId) => {
    try {
        const result = await event.destroy({
            where: {
                id: eventId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}


module.exports = eventUtil;