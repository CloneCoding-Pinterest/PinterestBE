const UserRepository = require('../repositories/user.repository');
const CommentRepository = require('../repositories/comment.repository');

const { NotFoundException } = require('../../models/exception/custom.exception');

class CommentService {
    #userRepository;
    #commentRepository;

    constructor() {
        this.#userRepository = new UserRepository();
        this.#commentRepository = new CommentRepository();
    }

    getComment = async (pinId) => {
        return await this.#commentRepository.getComment(pinId);
    };

    // 댓글 작성
    createComment = async (pinId, content, userId) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const createComment = await this.#commentRepository.createComment(pinId, content, userId);
        const createdPinComment = await this.#commentRepository.createPinComment(
            userId,
            pinId,
            createComment.commentId
        );

        const comment = {
            author: user.nickname,
            commentId: createComment.commentId,
            content: createComment.content,
            createdAt: createComment.createdAt
        };

        return comment;
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
        const comment = await this.#commentRepository.updateComment(commentId, content, userId);
        const isExistsCommentByCommentId = await this.#commentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) {
            throw new Error('존재하지 않는 댓글입니다.');
        }

        return comment;
    };
    // 댓글 삭제
    // 유저와 연동해서 삭제 가능하게하기 만들어야함
    deleteComment = async (commentId, userId) => {
        const isExistsCommentByCommentId = await this.#commentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) {
            throw new Error('존재하지 않는 댓글입니다.');
        }
        const deleteComment = await this.#commentRepository.deleteComment(commentId, userId);
        await this.#commentRepository.deletePinComment(commentId);

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
