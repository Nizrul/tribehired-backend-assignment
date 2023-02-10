const express = require('express');
const validateComments = require('../middleware/validate-comments.middleware');
const commentsController = require('../controller/comments.controller');

const commentsRouter = express.Router(); 

commentsRouter.get('', commentsController.getAll);
commentsRouter.get('/search', validateComments, commentsController.search)

module.exports = commentsRouter