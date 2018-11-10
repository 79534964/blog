let shell = require('shelljs');

const reload = () => {
    shell.exec('pm2 reload git');
};

module.exports = {
    reload
};
