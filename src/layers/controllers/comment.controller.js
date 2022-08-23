const e = require('express');
const joi = require('joi');
const { FormProvider } = require('../../modules/_.module.loader');

const CommentService = require('../services/comment.service');
const BaseController = require('./base.controller');

class CommentController extends BaseController {
    CommentService = new CommentService();

    formProvider;
    constructor() {
        super();
        this.formProvider = new FormProvider();
    }

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    getComment = async (req, res, next) => {
        const { pinId } = req.query;

        try {
            const commentList = await this.CommentService.getComment(pinId);

            return res.status(200).json(
                this.formProvider.getSuccessFormDto('댓글 조회에 성공했습니다.', {
                    commentList
                })
            );
        } catch (err) {
            const exception = this.exceptionHandler(err);

            return res
                .status(exception.statusCode)
                .json(this.formProvider.getFailureFormDto(exception.message));
        }
    };

    // 댓글 작성
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    createComment = async (req, res, next) => {
        const { pinId, content } = req.body;
        const userId = res.locals.userId;

        try {
            await joi
                .object({
                    pinId: joi.number().required(),
                    userId: joi.number().required(),
                    content: joi.string().required()
                })
                .validateAsync({
                    pinId,
                    content,
                    userId
                });

            const comment = await this.CommentService.createComment(pinId, content, userId);
            return res
                .status(200)
                .json(
                    this.formProvider.getSuccessFormDto('댓글 작성에 성공했습니다.', { comment })
                );
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.formProvider.getFailureFormDto(exception.message));
        }
    };

    // 댓글 수정
    updateComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = res.locals.userId;

        try {
            const comment = await this.CommentService.updateComment(commentId, content, userId);
            res.status(200).json({
                isSuccess: true,
                message: '댓글 수정에 성공했습니다.',
                result: { comment }
            });
        } catch (err) {
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
        const userId = res.locals.userId;

        try {
            await this.CommentService.deleteComment(commentId, userId);
            res.status(200).json({
                isSuccess: true,
                message: '댓글 삭제에 성공했습니다.',
                result: {}
            });
        } catch (err) {
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
