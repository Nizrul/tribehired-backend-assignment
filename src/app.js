const express = require('express');
const commentsRouter = require('./route/comments.router');
const postsRouter = require('./route/posts.router');
// setup dotenv
require('dotenv').config({path: __dirname + '/../.env'});

const app = express();
const port = process.env.PORT || 13000;

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})