/**
 * *.js 모듈 들을 require export 하는 사이에서 조금 더 안정적인 느낌 줄 수 있어요.
 */
const globalRouter = require('./routers/global.router');
const pinRouter = require('./routers/pin.router');
const authRouter = require('./routers/auth.router');
const commentRouter = require('./routers/comment.router');

module.exports = {
    globalRouter,
    pinRouter,
    authRouter,
    commentRouter
};
