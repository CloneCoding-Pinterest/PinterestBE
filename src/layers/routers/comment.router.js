const { Router } = require('express');

const commentRouter = Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

// 댓글 작성
commentRouter.post('', commentController.createComment);
// 댓글 수정
commentRouter.put('/:commentId', commentController.updateComment);
// 댓글 삭제
commentRouter.delete('/:commentId', commentController.deleteComment);

module.exports = commentRouter;
