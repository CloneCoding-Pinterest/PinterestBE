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
            await this.CommentService.createComment(userId, pinId, content);

            res.status(200).json({
                isSuccess: true,
                message: '댓글 작성 성공',
                result: {}
            });
        } catch (err) {
            next();
            // 에러코드 수정 필요
        }
    };
    // 댓글 수정
    updateComment = async (req, res, next) => {
        const userId = 1;
        const { commentId } = req.params;
        const { content } = req.body;

        try {
            await this.CommentService.updateComment(userId, commentId, content);

            res.status(200).json({
                isSuccess: true,
                message: '댓글 수정 성공',
                result: {}
            });
        } catch (err) {
            console.error(err);
            next();
            // 에러코드 수정 필요
        }
    };
    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        const userId = 1;
        const { commentId } = req.params;

        try {
            await this.CommentService.deleteComment(userId, commentId);

            res.status(200).json({
                isSuccess: true,
                message: '댓글 삭제 성공',
                result: {}
            });
        } catch (err) {
            console.error(err);
            next();
            // 에러코드 수정 필요
        }
    };
    // 해당 유저 찾기
    // findById = async (req, res, next) => {
    //     const userId = 2;
    //     const { commentId } = req.params;

    //     try {
    //         const findById = await this.commentService.findById(userId, commentId);

    //         return res.json({ findById });
    //     } catch (err) {
    //         next(err);
    //     }
    // };
}

module.exports = CommentController;
