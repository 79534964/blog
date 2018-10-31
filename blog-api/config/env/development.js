const path = require('path');
const md5 = require('crypto').createHash('md5');

let account = 'admin';
let password = 'wzy123456';

module.exports = {
    port: 4001,
    blogPath: path.resolve(__dirname, '../../hexo/source/_posts'),
    user: {
        account,
        password,
        userToken: (() => {
            return md5.update(account).update(password).digest('hex');
        })()
    }
};
