const { User, UserDetail, Comment, PinComment, UserPin } = require('../../sequelize/models');

class CommentRepository {
    getComment = async (pinId) => {
        const findedCommentList = await PinComment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['userId', 'detailId'],
                    raw: true,
                    include: [
                        {
                            model: UserDetail,
                            attributes: ['detailId', ['nickname', 'author']],
                            raw: true
                        }
                    ]
                },
                {
                    model: Comment,
                    attributes: ['content', 'createdAt'],
                    raw: true
                }
            ],
            where: {
                pinId: 1
            },
            limit: 30,
            raw: true
        });

        const commentList = [];
        for (const comment of findedCommentList) {
            commentList.push({
                commentId: comment['commentId'],
                content: comment['Comment.content'],
                createdAt: comment['Comment.createdAt'],
                author: comment['User.UserDetail.author']
            });
        }

        return commentList;
    };
    // PinComment 생성
    createPinComment = async (userId, pinId, commentId) => {
        const createdPinComment = await PinComment.create({
            userId,
            pinId,
            commentId
        });
        return createdPinComment;
    };
    // 댓글 작성
    createComment = async (pinId, content, userId) => {
        const createResult = await Comment.create({
            pinId,
            content,
            userId
        });
        return createResult.dataValues;
    };
    // 댓글 수정
    updateComment = async (commentId, content, userId) => {
        await Comment.update({ content }, { where: { commentId } });
        const commentResult = await Comment.findOne({
            where: { commentId }
        });

        const updateResult = {
            Comment: {
                commentId: commentResult.dataValues.commentId,
                author: userId,
                content: commentResult.dataValues.content,
                createdAt: new Date()
            }
        };

        return updateResult;
    };
    // PinCommentId 삭제
    deletePinComment = async (commentId) => {
        const deletePinComment = await PinComment.destroy({ where: { commentId } });
        return deletePinComment;
    };
    // 댓글 삭제
    deleteComment = async (commentId) => {
        const deleteComment = await Comment.destroy({ where: { commentId } });
        return deleteComment;
    };
    // 댓글 존재 유무 확인
    isExistsCommentByCommentId = async (commentId) => {
        const findCommentId = await Comment.findOne({ where: { commentId } });
        return findCommentId;
    };
    // 댓글 작성자 찾기
    findByUserId = async (userId) => {
        const findByUserId = await UserPin.findOne({ where: { userId } });
        return findByUserId.dataValues;
    };
}

module.exports = CommentRepository;
