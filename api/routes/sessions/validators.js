const { celebrate, Joi } = require('celebrate');

const find = celebrate({ query: { limit: Joi.number() } });

module.exports = { find };
