const commentsService = require('../service/comments.service');

const getMe = async (req, res) => {  
    res.status(200).json(req.query);
}

const getAll = async (req, res) => {
    try {
        const comments = await commentsService.getAll();
        res.status(200).json(comments);
    }
    catch (ex) {
        res.status(522).json({
            message: 'Failed to get all comments',
            exception: ex.message 
        });
    }
}

const search = async (req, res) => {
    try {
        const comments = await commentsService.search(req.query);
        res.status(200).json(comments);
    }
    catch (ex) {
        res.status(522).json({
            message: 'Failed to search comments',
            exception: ex.message 
        });
    }
}

module.exports = {
    getMe,
    getAll,
    search
}