require('babel-register')({
    plugins: [
        'transform-decorators-legacy'
    ]
});
require('./server/index');