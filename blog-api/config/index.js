const host = process.env.HOST || 'localhost';
const env = process.env.NODE_ENV || 'development';
const {port, blogPath, user} = require(`./env/${env}`);

module.exports = {
    env,
    host,
    port,
    user,
    blogPath
};
