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
            const createdComment = await this.commentService.createComment(userId, pinId, content);
            res.status(200).json({
                isSuccess: true,
                message: '댓글 작성 성공',
                data: createdComment
            });
        } catch (err) {
            next(err);
            // res.status(400).json({
            //     isSuccess: false,
            //     message: '댓글 작성 실패' + err.message,
            //     createdComment: {}
            // });
        }
    };
}

module.exports = CommentController;
