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

    /**
     *
     * @param { number } pinId
     * @returns { Promise<{ commentId: any, content: any, createdAt: any, author: any }> }
     */
    getComment = async (pinId) => {
        const pin = await this.#pinRepository.findPinByPinId(pinId);
        if (pin === null) throw new NotFoundException('존재하지 않는 핀 입니다.');

        return await this.#commentRepository.getComment(pinId);
    };

    /**
     *
     * @param { number } pinId
     * @param { string } content
     * @param { number } userId
     * @returns { Promise<{ author: string, commentId: number, content: string, createdAt: Date }>}
     */
    createComment = async (pinId, content, userId) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const pin = await this.#pinRepository.findPinByPinId(pinId);
        if (pin === null) throw new NotFoundException('존재하지 않는 핀 입니다.');

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

    /**
     *
     * @param { number } commentId
     * @param { string } content
     * @param { number } userId
     * @returns  { Promise<{ commentId: any, author: any, content: any,createdAt: Date }>}
     */
    updateComment = async (commentId, content, userId) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const isFindedPinComment = await this.#commentRepository.findPinCommentByCommentId(
            commentId
        );
        if (isFindedPinComment === null) throw new NotFoundException('존재하지 않는 Pin 입니다.');

        const isExistsCommentByCommentId = await this.#commentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) throw new NotFoundException('존재하지 않는 댓글입니다.');

        const comment = await this.#commentRepository.updateComment(commentId, content, userId);

        return comment;
    };

    /**
     *
     * @param { number } commentId
     * @param { number } userId
     */
    deleteComment = async (commentId, userId) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const isFindedPinComment = await this.#commentRepository.findPinCommentByCommentId(
            commentId
        );
        if (isFindedPinComment === null) throw new NotFoundException('존재하지 않는 Pin 입니다.');

        const isExistsCommentByCommentId = await this.#commentRepository.isExistsCommentByCommentId(
            commentId
        );
        if (!isExistsCommentByCommentId) throw new NotFoundException('존재하지 않는 댓글입니다.');

        const deleteComment = await this.#commentRepository.deleteComment(commentId, userId);
        await this.#commentRepository.deletePinComment(commentId);

        return deleteComment;
    };
}
module.exports = CommentService;
