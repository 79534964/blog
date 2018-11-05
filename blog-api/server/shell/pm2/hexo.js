const process = require('child_process');

const reload = () => {
    return new Promise((resolve, reject) => {
        process.exec('pm2 reload hexo', (error, stdout, stderr) => {
            if (error) {
                console.log('exec error: ' + error);
                resolve(false);
                return;
            }
            console.log('shell: pm2 reload hexo');
            resolve(true);
        });
    });
};

module.exports = {
    reload
};
