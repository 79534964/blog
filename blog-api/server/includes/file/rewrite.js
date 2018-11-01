const path = require('path');
const {stat, mkdir, readFile, writeFile, unlink} = require('./index');

const dirExists = async ({dir}) => {
    let isExists = await stat({path: dir});
    if (isExists && isExists.isDirectory()) {
        return true;
    } else if (isExists) {
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

module.exports = {
    dirExists,
    dirTranslate
};
