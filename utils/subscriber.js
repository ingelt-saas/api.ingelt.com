const { subscriber } = require("../models");
const subscriberUtil = {};

// POST subscribers
subscriberUtil.create = async (data) => {
  try {
    const newSubscriber = await subscriber.create(data);
    return newSubscriber;
  } catch (error) {
    throw error;
  }
};

module.exports = subscriberUtil;
