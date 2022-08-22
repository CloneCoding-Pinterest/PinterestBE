const e = require('express');
const CommentService = require('../services/comment.service');

class CommentController {
    CommentService = new CommentService();

    // 댓글 작성
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    createComment = async (req, res, next) => {
        const userId = 1;
        const pinId = 1;
        const { content } = req.body;

        try {
            const createComment = await this.CommentService.createComment(userId, pinId, content);

            res.status(200).json({
                isSuccess: true,
                message: '댓글 작성 성공',
                data: { createComment }
            });
        } catch (err) {
            // console.error(err);
            next();
            // 에러코드 수정 필요
        }
    };
    // 댓글 수정
    updateComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = 1;

        try {
            const updateComment = await this.CommentService.updateComment(
                commentId,
                content,
                userId
            );

            res.status(200).json({
                isSuccess: true,
                message: '댓글 수정 성공',
                data: { updateComment }
            });
        } catch (err) {
            // console.error(err);
            next();
            // 에러코드 수정 필요
        }
    };
    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;

        try {
            const deleteComment = await this.CommentService.deleteComment(commentId);

            res.status(200).json({
                isSuccess: true,
                message: '댓글 삭제 성공',
                data: { deleteComment }
            });
        } catch (err) {
            // console.error(err);
            next();
            // 에러코드 수정 필요
        }
    };
}

module.exports = CommentController;
