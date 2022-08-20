const { Comment } = require('../../sequelize/models');

class CommentRepository {
    // 댓글 작성
    createComment = async (userId, pinId, content) => {
        await Comment.create({
            userId,
            postId,
            content
        });
        return;
    };
}

module.exports = CommentRepository;
