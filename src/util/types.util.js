const isString = (val) => typeof val === 'string' || val instanceof String;

const isNumeric = (val) => !isNaN(val);

module.exports = {
    isString,
    isNumeric
}