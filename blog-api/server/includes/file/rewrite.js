const path = require('path');
const {stat, mkdir, readFile, writeFile, unlink, readdir, rmdir} = require('./index');

const dirExists = async ({dir}) => {
    let stats = await stat({path: dir});
    if (stats && stats.isDirectory()) {
        return true;
    } else if (stats) {
        return false;
    }
    //如果该路径不存在 拿到上级路径 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists({dir: path.parse(dir).dir});
    let mkdirStatus;
    if (status) {
        mkdirStatus = await mkdir({dir});
    }
    return mkdirStatus;
}

const dirTranslate = async ({before, after}) => {
    let data = await readFile({path: before});
    if (!data) {
        return false;
    }
    let bool = await writeFile({path: after, content: data});
    if (!bool) {
        return false;
    }
    return await unlink({path: before});
}

const emptyDir = async ({path}) => {
    let files = await readdir({path});
    if (!files) {
        return true;
    }
    await files.forEach(async (file) => {
        let filePath = `${path}/${file}`;
        let stats = await stat({path: filePath});
        if (stats.isDirectory()) {
            await emptyDir({path: filePath});
        } else {
            await unlink({path: filePath});
        }
    });
}

const rmEmptyDir = async ({path}) => {
    let files = await readdir({path});
    const echo = async (e) => {
        await rmEmptyDir({path: `${path}/${e}`});
    }
    if (files) {
        for (let file of files) {
            await echo(file);
        }
        await rmdir({path});
    } else {
        await rmdir({path});
    }
}

module.exports = {
    dirExists,
    dirTranslate,
    emptyDir,
    rmEmptyDir
};
