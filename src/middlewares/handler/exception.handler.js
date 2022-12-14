const { CustomException, UnkownException } = require('../../models/_.models.loader');

const exceptionHandler = (err) => {
    if (err instanceof CustomException) return err;
    else if (err instanceof Error) return new UnkownException(err.message);
    else return new UnkownException(`알 수 없는 에러가 발생하였습니다. ${JSON.stringify(err)}`);
};

module.exports = {
    exceptionHandler
};
