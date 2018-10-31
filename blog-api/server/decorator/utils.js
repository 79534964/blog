const R = require('ramda');

const resolvePath = R.unless(
    R.startsWith('/'),
    R.curryN(2, R.concat)('/')
);

const changeToArr = R.unless(
    R.is(Array),
    R.of
);

const convert = middleware => (target, key, descriptor) => {
    target[key] = R.compose(
        R.concat(
            changeToArr(middleware)
        ),
        changeToArr
    )(target[key]);
    return descriptor;
};


module.exports = {
    resolvePath,
    changeToArr,
    convert
};
