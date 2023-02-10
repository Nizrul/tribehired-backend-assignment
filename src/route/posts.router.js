const express = require('express');
const postsController = require('../controller/posts.controller')

const postsRouter = express.Router(); 

postsRouter.get('', postsController.getAll);

module.exports = postsRouter