const e = require('express');
const CommentService = require('../services/comment.service');
const BaseController = require('./base.controller');
// const joi = require('joi');

class CommentController extends BaseController {
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
            console.log(err);
            const exception = this.exceptionHandler(err);
            return res.status(exception.statusCode).json({
                isSuccess: false,
                message: exception.message,
                result: {}
            });
        }
    };

    // 댓글 수정
    updateComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = 2;

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
            console.log(err);
            const exception = this.exceptionHandler(err);
            return res.status(exception.statusCode).json({
                isSuccess: false,
                message: exception.message,
                result: {}
            });
        }
    };
    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;
        const userId = 2;

        try {
            const deleteComment = await this.CommentService.deleteComment(commentId, userId);
            res.status(200).json({
                isSuccess: true,
                message: '댓글 삭제 성공',
                data: { deleteComment }
            });
        } catch (err) {
            console.log(err);
            const exception = this.exceptionHandler(err);
            return res.status(exception.statusCode).json({
                isSuccess: false,
                message: exception.message,
                result: {}
            });
        }
    };
}

module.exports = CommentController;
