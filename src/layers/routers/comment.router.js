const { Router } = require('express');
const { unloginUserGuard } = require('../../middlewares/_.middle.loader');

const commentRouter = Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

// 댓글 전체 조회
commentRouter.get('', commentController.getComment);

// 댓글 작성
commentRouter.post('', unloginUserGuard, commentController.createComment);

// 댓글 수정
commentRouter.put('/:commentId', unloginUserGuard, commentController.updateComment);

// 댓글 삭제
commentRouter.delete('/:commentId', unloginUserGuard, commentController.deleteComment);

module.exports = commentRouter;
