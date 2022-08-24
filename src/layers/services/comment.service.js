const UserRepository = require('../repositories/user.repository');
const CommentRepository = require('../repositories/comment.repository');
const PinRepository = require('../repositories/pin.repository');

const { NotFoundException } = require('../../models/exception/custom.exception');

class CommentService {
    #userRepository;
    #commentRepository;
    #pinRepository;

    constructor() {
        this.#userRepository = new UserRepository();
        this.#commentRepository = new CommentRepository();
        this.#pinRepository = new PinRepository();
    }

    // 댓글 조회
    getComment = async (pinId) => {
        const pin = await this.#pinRepository.findPinByPinId(pinId);
        if (pin === null) throw new Error('존재하지 않는 핀 입니다.');

        return await this.#commentRepository.getComment(pinId);
        
    };

    // 댓글 작성
    createComment = async (pinId, content, userId) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const pin = await this.#pinRepository.findPinByPinId(pinId);
        if (pin === null) throw new Error('존재하지 않는 핀 입니다.');

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
    updateComment = async (commentId, content, userId) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const pin = await this.#pinRepository.findPinByPinId(pinId);
        if (pin === null) throw new Error('존재하지 않는 핀 입니다.');

        const isExistsCommentByCommentId = await this.#commentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) {
            throw new Error('존재하지 않는 댓글입니다.');
        }
        // const findByUserId = await this.CommentRepository.findByUserId(userId);
        // if (!findByUserId) {
        //     throw new Error('댓글 작성자가 아닙니다.');
        // }
        const comment = await this.#commentRepository.updateComment(commentId, content, userId);

        return comment;
    };
    // 댓글 삭제
    deleteComment = async (commentId, userId) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const pin = await this.#pinRepository.findPinByPinId(pinId);
        if (pin === null) throw new Error('존재하지 않는 핀 입니다.');

        const isExistsCommentByCommentId = await this.#commentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) {
            throw new Error('존재하지 않는 댓글입니다.');
        }

        // const findByUserId = await this.CommentRepository.findByUserId(userId);
        // if (!findByUserId) {
        //     throw new Error('댓글 작성자가 아닙니다.');
        // }

        const deleteComment = await this.#commentRepository.deleteComment(commentId, userId);
        await this.#commentRepository.deletePinComment(commentId);

        return deleteComment;
    };
}
module.exports = CommentService;
