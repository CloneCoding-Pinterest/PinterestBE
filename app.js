const { User, Pin, UserPin, Comment, PinComment } = require('./src/sequelize/models');
const comment = require('./src/sequelize/models/comment');

const test = async () => {
    const user = await User.create({});

    const pin = await Pin.create({
        title: 'title',
        content: 'content',
        picKey: 'sdfsd',
        picUrl: 'asfdasdf'
    });

    const userPin = await UserPin.create({
        userId: user.dataValues.userId,
        pinId: pin.dataValues.pinId
    });

    // console.log(user.dataValues);
    // console.log(pin.dataValues);
    // console.log(userPin.dataValues);

    const comment = await Comment.create({
        userId: 'userId',
        postId: 'postId',
        content: 'content'
    });
    const pinComment = await PinComment.create({
        userId: user.dataValues.userId,
        pinId: pin.dataValues.pinId,
        commentId: comment.dataValues.commentId
    });
    console.log(user.dataValues);
    console.log(pin.dataValues);
    console.log(userPin.dataValues);
    console.log(comment.dataValues);
    console.log(pinComment.dataValues);
};
test();
