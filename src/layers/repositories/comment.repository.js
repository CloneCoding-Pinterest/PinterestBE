const { Comment, PinComment, UserPin } = require('../../sequelize/models');

class CommentRepository {
    // PinComment 생성
    createPinComment = async (pinId, commentId) => {
        const createdPinComment = await PinComment.create({
            pinId,
            commentId
        });
        return createdPinComment;
    };
    // 댓글 작성
    createComment = async (userId, pinId, content) => {
        const createdComment = await Comment.create({
            userId,
            pinId,
            content
        });
        return createdComment.dataValues;
    };
    // 댓글 수정
    updateComment = async (commentId, content) => {
        const updateComment = await Comment.update({ content }, { where: { commentId } });
        return updateComment;
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
    findByUserId = async (user) => {};
}

module.exports = CommentRepository;