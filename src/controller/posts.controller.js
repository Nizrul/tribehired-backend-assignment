const postsService = require('../service/posts.service');

const getAll = async (req, res) => {
    try {
        const posts = await postsService.getAll();
        res.status(200).json(posts);
    }
    catch (ex) {
        res.status(522).json({
            message: 'Failed to get all posts',
            exception: ex.message 
        });
    }
}

module.exports = {
    getAll
}