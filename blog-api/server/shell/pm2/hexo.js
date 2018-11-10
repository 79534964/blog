let shell = require('shelljs');

const reload = () => {
    shell.exec('pm2 reload hexo');
};

module.exports = {
    reload
};
