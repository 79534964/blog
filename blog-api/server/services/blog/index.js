const fs = require('fs');
const {Service, Interface} = require('../../decorator/service');
const {blogPath} = require('../../../config/index');
const result = require('../base/result');

@Service('blogService')
class Server {

    @Interface
    async query() {
        const data = await new Promise((resolve, reject) => {
            let list = [];
            try {
                list = fs.readdirSync(blogPath);
            } catch (e) {
                resolve(result.error({msg: '查询失败！'}));
                return;
            }
            resolve(result.success({data: list}));
        });
        return data;
    }

    @Interface
    async details({file}) {
        const data = await new Promise((resolve, reject) => {
            fs.readFile(`${blogPath}/${file}`, (err, data) => {
                if (data === undefined || err) {
                    resolve(result.error({msg: '读取失败！'}));
                    return;
                }
                resolve(result.success({data: data.toString()}));
            });
        });
        return data;
    }

    @Interface
    async delete({file}) {
        const res = await new Promise((resolve, reject) => {
            fs.unlink(`${blogPath}/${file}`, (err) => {
                if (err) {
                    resolve(result.error({msg: '删除失败！'}));
                    return;
                }
                resolve(result.success({}));
            });
        });
        return res;
    }

    @Interface
    async add({file, content}) {
        let isFlag = await this.isFile(file);
        if (isFlag) {
            return result.error({msg: '文件已存在！'});
        }
        let isSuccess = await this.writeFile({file, content});
        return isSuccess ? result.success({}) : result.error({msg: '操作失败！'});
    }

    @Interface
    async update({file, content}) {
        let isFlag = await this.isFile(file);
        if (!isFlag) {
            return result.error({msg: '文件不存在！'});
        }
        let isSuccess = await this.writeFile({file, content});
        return isSuccess ? result.success({}) : result.error({msg: '操作失败！'});
    }

    async isFile(file) {
        const bool = await new Promise((resolve, reject) => {
            fs.exists(`${blogPath}/${file}`, (exists) => {
                if (exists) {
                    resolve(true);
                    return;
                }
                resolve(false);
            })
        });
        return bool;
    }

    async writeFile({file, content}) {
        const bool = await new Promise((resolve, reject) => {
            fs.writeFile(`${blogPath}/${file}`, content, (err) => {
                if (err) {
                    resolve(false);
                    return;
                } else {
                    resolve(true);
                }
            });
        });
        return bool;
    }

}
