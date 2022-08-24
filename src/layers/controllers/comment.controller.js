const e = require('express');
const joi = require('joi');
const { FormProvider } = require('../../modules/_.module.loader');

const CommentService = require('../services/comment.service');
const BaseController = require('./base.controller');

class CommentController extends BaseController {
    #commentService;
    #formProvider;

    constructor() {
        super();
        this.#commentService = new CommentService();
        this.#formProvider = new FormProvider();
    }

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    getComment = async (req, res, next) => {
        const { pinId } = req.query;

        try {
            const commentList = await this.#commentService.getComment(pinId);

            await joi
                .object({
                    pinId: joi.number().required()
                })
                .validateAsync({
                    pinId
                });

            return res.status(200).json(
                this.#formProvider.getSuccessFormDto('댓글 조회에 성공했습니다.', {
                    commentList
                })
            );
        } catch (err) {
            const exception = this.exceptionHandler(err);

            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
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

            const comment = await this.#commentService.createComment(pinId, content, userId);
            return res
                .status(200)
                .json(
                    this.#formProvider.getSuccessFormDto('댓글 작성에 성공했습니다.', { comment })
                );
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };

    // 댓글 수정
    updateComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = res.locals.userId;

        try {
            await joi
                .object({
                    commentId: joi.number().required(),
                    content: joi.string().required(),
                    userId: joi.number().required()
                })
                .validateAsync({
                    commentId,
                    content,
                    userId
                });

            const comment = await this.#commentService.updateComment(commentId, content, userId);

            return res
                .status(200)
                .json(
                    this.#formProvider.getSuccessFormDto('댓글 수정에 성공했습니다.', { comment })
                );
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };
    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;
        const userId = res.locals.userId;

        try {
            await joi
                .object({
                    commentId: joi.number().required(),
                    userId: joi.number().required()
                })
                .validateAsync({
                    commentId,
                    userId
                });
            await this.#commentService.deleteComment(commentId, userId);
            return res
                .status(200)
                .json(this.#formProvider.getSuccessFormDto('댓글 삭제에 성공했습니다.', {}));
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };
}

module.exports = CommentController;
