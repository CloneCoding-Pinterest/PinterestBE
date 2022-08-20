const { Router } = require('express');

const commentRouter = Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

// 댓글 작성
commentRouter.post('', commentController.createComment);

module.exports = commentRouter;
