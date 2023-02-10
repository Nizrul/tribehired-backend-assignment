const typesUtil = require('../util/types.util')

module.exports = function (req, res, next) {
    const validKeys = ['postId', 'id', 'name', 'email', 'body', 'type'];
    let errorContext = {};
    console.log('Validating comment query');

    const {type, ...searchParams} = req.query;
    try {
        if (Object.keys(searchParams).length === 0) {
            throw new Error('Missing search parameters')
        }
    
        if (type && !['some', 'every'].includes(type)) {
            throw new Error('Invalid search type (Only accepts some or every)');
        }
    
        const invalidParameters = Object.keys(req.query).filter(key => 
            !validKeys.includes(key) ||
            !(Array.isArray(req.query[key]) || 
            typesUtil.isString(req.query[key]) ||
            typesUtil.isNumeric(req.query[key])));

        if (invalidParameters.length > 0) {
            errorContext.invalidParameters = invalidParameters;
            throw new Error('Invalid search parameters');
        }

        next();
    }
    catch(ex) {
        res.status(400).json({
            message: ex.message,
            ...errorContext
        });
    }
};