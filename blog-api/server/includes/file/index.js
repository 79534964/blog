const fs = require('fs');

const readdir = ({path}) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(files);
        });
    });
}

const readFile = ({path}) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (data === undefined || err) {
                resolve(false);
                return;
            }
            resolve(data);
        });
    });
}


const unlink = ({path}) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}


const exists = ({path}) => {
    return new Promise((resolve, reject) => {
        fs.exists(path, (exists) => {
            if (exists) {
                resolve(true);
                return;
            }
            resolve(false);
        })
    });
}

const writeFile = ({path, content}) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}

const stat = ({path}) => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(stats);
        })
    })
}

const mkdir = ({dir}) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, (err) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        })
    })
}

const rmdir = ({path}) => {
    return new Promise((resolve, reject) => {
        fs.rmdir(path, (err) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        })
    })
}

module.exports = {
    readdir,
    readFile,
    unlink,
    exists,
    writeFile,
    stat,
    mkdir,
    rmdir
};
