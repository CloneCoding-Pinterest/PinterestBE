const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    CommentRepository = new CommentRepository();

    // 댓글 작성
    createComment = async (userId, pinId, content) => {
        const createComment = await this.CommentRepository.createComment(userId, pinId, content);
        const createdPinComment = await this.CommentRepository.createPinComment(
            pinId,
            createComment.commentId
        );
        if (!content) {
            return { msg: '댓글 내용을 적엉', success: false };
            // throw new Error(err);
        }
        return createdPinComment;
    };
    // 댓글 수정
    // 유저와 연동해서 수정 가능하게하기 만들어야함
    // 수정할 댓글이 없을시 조건 만들어야함 (지금은 없는댓글을 수정하면 "updateComment": 0 으로 수정된게 0이라고 뜸)
    updateComment = async (commentId, content, userId) => {
        const isExistsCommentByCommentId = await this.CommentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) {
            return '수정할 댓글이 없엉';
        }

        // const commentUpdate = await this.CommentRepository.findById(userId);
        // if (userId !== commentUpdate) {
        //     // userId = 1 commentUpdate = 2
        //     return '작성자가 아닐때';
        // }

        const updateComment = await this.CommentRepository.updateComment(
            commentId,
            content,
            userId
        );
        if (!content) {
            return '댓글 내용을 적어';
        }

        return updateComment;
    };
    // 댓글 삭제
    // 유저와 연동해서 삭제 가능하게하기 만들어야함
    // 삭제할 댓글이 없을시 조건 만들어야함 (지금은 없는댓글을 삭제하면 "deleteComment": 0 으로 삭제된게 0이라고 뜸)
    deleteComment = async (commentId) => {
        const isExistsCommentByCommentId = await this.CommentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) {
            return '삭제할 댓글이 없엉';
        }
        await this.CommentRepository.deletePinComment(commentId);
        const deleteComment = await this.CommentRepository.deleteComment(commentId);

        return deleteComment;
    };
}
module.exports = CommentService;

// UserPin에 userId가 있다
