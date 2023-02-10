const axios = require('axios');
const commentsService = require('./comments.service');

const getAll = async () => {
    try {
        comments = await commentsService.getAll();

        // grouping by postId so we're only scanning through all the comments once
        groupedCommentCount = comments.reduce((group, comment) => {
            group[comment.postId] = (group[comment.postId] ?? 0) + 1;
            return group;
        }, {})

        posts = (await axios.get(process.env.API_BASE_URL + '/comments')).data;

        return posts.map(post => {
            return {
                post_id: post.id,
                post_body: post.body,
                post_title: post.title,
                total_number_of_comments: groupedCommentCount[post.id] ?? 0
            }
        })
        .sort((a, b) => a.total_number_of_comments - b.total_number_of_comments);
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
        throw new Error(`Failed to retrieve all posts: ${ex.message}`);
    }
}

module.exports = {
    getAll
}