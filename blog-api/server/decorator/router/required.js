const R = require('ramda');
const {convert} = require('../utils');
const {result} = require('../../services/index');

const Required = paramsObj => convert(async (ctx, next) => {
    let errParams = [];

    R.forEachObjIndexed((val, key) => {
            errParams = errParams.concat(
                R.filter(
                    name => !R.has(name, ctx.request[key])
                )(val)
            );
        }
    )(paramsObj);

    if (!R.isEmpty(errParams)) {
        return ctx.body = result.requiredError({msg: `${R.join(', ', errParams)} is required`});
    }
    await next();
});

module.exports = Required;
