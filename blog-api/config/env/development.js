const path = require('path');
const md5 = require('crypto').createHash('md5');

const account = 'admin';
const password = 'sph123456';
const rootPath = '../../';

module.exports = {
    port: 4001,
    blogPath: path.resolve(__dirname, `${rootPath}hexo/source/_posts`),
    nginxPath: path.resolve(__dirname, `${rootPath}webapps/blog/img`),
    backupsPath: path.resolve(__dirname, `${rootPath}hexo/source`),
    user: {
        account,
        password,
        userToken: (() => {
            return md5.update(account).update(password).digest('hex');
        })()
    }
};
