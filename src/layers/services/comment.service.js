const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    CommentRepository = new CommentRepository();

    // 댓글 작성
    createComment = async (pinId, content, userId) => {
        if (!content) {
            throw new Error('작성할 댓글 내용을 입력해주세요.');
        }
        const createComment = await this.CommentRepository.createComment(pinId, content, userId);
        const createdPinComment = await this.CommentRepository.createPinComment(
            userId,
            pinId,
            createComment.commentId
        );
        return createdPinComment;
    };
    // 댓글 수정
    // 유저와 연동해서 수정 가능하게하기 만들어야함
    updateComment = async (commentId, content, userId) => {
        if (!content) {
            throw new Error('수정할 댓글 내용을 입력해주세요.');
        }
        // const commentUpdate = await this.CommentRepository.findByUserId(userId);
        // if (userId !== commentUpdate.userId) {
        //     throw new Error('자신이 작성한 댓글이 아닙니다.');
        // }
        // console.log(commentUpdate);
        const Comment = await this.CommentRepository.updateComment(commentId, content, userId);
        const isExistsCommentByCommentId = await this.CommentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) {
            throw new Error('존재하지 않는 댓글입니다.');
        }

        return Comment;
    };
    // 댓글 삭제
    // 유저와 연동해서 삭제 가능하게하기 만들어야함
    deleteComment = async (commentId, userId) => {
        const isExistsCommentByCommentId = await this.CommentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) {
            throw new Error('존재하지 않는 댓글입니다.');
        }
        const deleteComment = await this.CommentRepository.deleteComment(commentId, userId);
        await this.CommentRepository.deletePinComment(commentId);

        return deleteComment;
    };
}
module.exports = CommentService;

// UserPin에 userId가 있다
// const findByUserId = await this.CommentRepository.findByUserId(userId);
// if (findByUserId !== updateComment) {
//     throw new Error('댓글 작성자가 아닙니다.');
// }
// const findByUserId = await this.CommentRepository.findByUserId(userId);
// if (findByUserId !== deleteComment) {
//     throw new Error('댓글 작성자가 아닙니다.');
// }
