const {convert} = require('../utils');
const result = require('../../includes/result');
const {user} = require('../../../config/index');

const Auth = convert(async (ctx, next) => {
    if (ctx.request.body.userToken !== user.userToken) {
        return ctx.body = result.autoError({});
    }
    await next();
});

module.exports = Auth;
