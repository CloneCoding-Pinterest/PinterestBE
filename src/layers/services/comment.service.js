const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    CommentRepository = new CommentRepository();

    // 댓글 작성
    createComment = async (userId, pinId, content) => {
        const createdComment = await this.CommentRepository.createComment(userId, pinId, content);
        return createdComment;
    };
    // 댓글 수정
    updateComment = async (userId, commentId, content) => {
        // const findById = await this.CommentRepository.findById(userId, commentId);

        // if (!findById) {
        //     return '자신이 쓴글이 아닐때';
        // }
        // if (!content) {
        //     return '내용을 입력하지 않았을때';
        // }

        const updateComment = await this.CommentRepository.updateComment(
            userId,
            commentId,
            content
        );

        return updateComment;
    };
    // 댓글 삭제
    deleteComment = async (userId, commentId) => {
        const deleteComment = await this.CommentRepository.deleteComment(userId, commentId);
        return deleteComment;
    };
    // 해당 유저 찾기
    findById = async (userId) => {
        const findById = await this.commentRepository.findById(userId);

        return { findById };
    };
}
module.exports = CommentService;
