const { Comment } = require('../../sequelize/models');

class CommentRepository {
    // 댓글 작성
    createComment = async (userId, pinId, content) => {
        await Comment.create({
            userId,
            pinId,
            content
        });
        return;
    };
    // 댓글 수정
    updateComment = async (userId, commentId, content) => {
        await Comment.update({ content }, { where: { commentId } });
        return;
    };
    // 댓글 삭제
    deleteComment = async (userId, commentId) => {
        await Comment.destroy({ where: { commentId } });
        return;
    };
    // 해당 유저 찾기
    // findById = async (userId, commentId) => {
    //     const findById = await Comment.findOne({
    //         where: { userId, commentId }
    //     });
    //     return findById;
    // };
}

module.exports = CommentRepository;
