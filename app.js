const { User, Pin, UserPin } = require('./src/sequelize/models');

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

    console.log(user.dataValues);
    console.log(pin.dataValues);
    console.log(userPin.dataValues);
};
test();
