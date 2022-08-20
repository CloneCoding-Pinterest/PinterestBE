const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    #commentRepository;
    commentRepository = new CommentRepository();

    // 댓글 작성
    createComment = async (userId, pinId, content) => {
        const createdComment = await this.#commentRepository.createComment(userId, pinId, content);
        return createdComment;
    };
}
module.exports = CommentService;
